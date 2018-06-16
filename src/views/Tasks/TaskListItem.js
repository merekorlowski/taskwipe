import React, { Component } from 'react';
import { object, array, func, string } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
	getDailyTasks,
	updateTask,
	deleteTask,
	archiveTask,
	startTask,
	stopTask,
	getOnGoingTask
} from '../../actions/tasks';
import { TASK, DATE_FORMAT } from '../../constants';

import './styles.scss';

class TaskListItem extends Component {
	newTask = {
		title: '',
		date: this.props.date,
		deadline: '',
		type: TASK.TYPE.NORMAL,
		projectId: '',
		comments: ''
	};

	onGoingInterval = null;

	state = {
		data: this.props.data || {...this.newTask},
		onGoingTime: null,
		isExpanded: false,
		mouseover: false
	};

	static propTypes = {
		onGoingTask: object,
		data: object.isRequired,
		userId: string.isRequired,
		date: string.isRequired,
		projects: array.isRequired,
		getDailyTasks: func.isRequired,
		updateTask: func.isRequired,
		deleteTask: func.isRequired,
		archiveTask: func.isRequired,
		startTask: func.isRequired,
		stopTask: func.isRequired,
		getOnGoingTask: func.isRequired
	};

	componentDidMount() {
		let { userId } = this.props;
		this.props.getOnGoingTask(userId);
	}

	componentWillUnmount() {
		const { data } = this.state;
		const { userId } = this.props;
		
		if (data.taskId) {
			this.props.updateTask(userId, data.taskId, data);
		}

		if (this.onGoingInterval) {
			clearInterval(this.onGoingInterval);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if(nextProps.onGoingTask && (nextProps.onGoingTask !== this.props.onGoingTask)) {
			this.startInterval(nextProps.onGoingTask);
		} else {
			this.setState({ onGoingTime: null });
		}
	}

	onChange = event => {
		const { data } = this.state;
		const { userId } = this.props;
		const { target } = event;
		
		data[target.name] = target.value;

		this.setState({ data });

		if (data.taskId) {
			if (event.target.name === 'date') {
				this.props.updateTask(userId, data.taskId, data);
				this.props.getDailyTasks(userId, event.target.date);
				this.props.getDailyTasks(userId, data.date);
			}
		}
	};
	
	onMouseEnter = () => { this.setState({ mouseover: true }); };
	onMouseLeave = () => { this.setState({ mouseover: false }); };

	onStartTimer = () => {
		const { taskId } = this.state.data;
		const { userId } = this.props;

		this.props.startTask(userId, taskId);
	};

	onStopTimer = () => {
		const { taskId } = this.state.data;
		const { userId } = this.props;
		this.props.stopTask(userId, taskId);
		clearInterval(this.onGoingInterval);
	};

	onDelete = () => {
		const { taskId } = this.state.data;
		const { userId } = this.props;
		this.props.deleteTask(userId, taskId);
	};

	onArchive = () => {
		const { taskId, date } = this.state.data;
		const { userId } = this.props;
		this.props.archiveTask(userId, taskId);
		this.props.getDailyTasks(userId, date);
	}

	toggleExpand = () => {
		let { isExpanded } = this.state;
		this.setState({ isExpanded: !isExpanded });
	}

	startInterval(onGoingTask) {
		this.setDuration(onGoingTask.start);
		if (this.onGoingInterval === null) {
			this.onGoingInterval = setInterval(() => {
				this.setDuration(onGoingTask.start);
			}, 1000);
		}
	}

	setDuration(startTime) {
		let ms = moment()
			.utc()
			.diff(moment(startTime, 'YYYY-MM-DD HH:mm:ss'));
		let d = moment.duration(ms);
		let s = Math.floor(d.asHours()) + moment(ms).format(':mm:ss');

		this.setState({
			onGoingTime: s
		});
	}

	get canStart() {
		let { onGoingTask } = this.props;
		return !onGoingTask && this.isToday
	}

	get isOnGoing() {
		let { data } = this.state;
		let { onGoingTask } = this.props;
		if (onGoingTask && onGoingTask.taskId == data.taskId) {
			return true;
		} else {
			return false;
		}
	}

	get isToday() {
		let { date } = this.props;
		return date === moment().format(DATE_FORMAT);
	}

	get iconAngle() {
		return this.isExpanded ? 'fa-angle-up' : 'fa-angle-down';
	}

	render() {
		let { data, isExpanded, onGoingTime, mouseover } = this.state;
		let { projects } = this.props;
		return (
			<div className={`task-item ${isExpanded ? 'expanded' : ''}`}>
				<div className="space-evenly">
					<span className="inline allign--middle icon"
						onClick={this.toggleExpand}
					>
						{isExpanded
							? <i className={`fa fa-angle-up`} />
							: <i className={`fa fa-angle-down`}	/>
						}
					</span>
					<input
						name="title"
						type="text"
						className="tw-form-elem allign--middle inline col-7"
						placeholder="Task"
						value={data.title}
						onChange={this.onChange}			
					/>
					{/* <Dropdown
						title="Actions"
						className="inline col-2"
						items={[
							{
								title: "Delete",
								action: this.onDelete
							},
							{
								title: "Archive",
								action: this.onArchive
							}
						]}	
					/> */}
					{data.taskId && (
						<span className="allign--middle inline col-2">
							{!this.isOnGoing ? (
								<button
									className={`tw-btn right ${!this.canStart ? 'disabled' : ''}`}
									onClick={this.onStartTimer}
									disabled={!this.canStart}
								>
									{/* <i className="fa fa-stopwatch space--right--one"></i> */}
									Start
								</button>
							) : (
								<button
									className="tw-btn right on-going-time"
									onClick={this.onStopTimer}
									onMouseEnter={this.onMouseEnter}
									onMouseLeave={this.onMouseLeave}
								>
									{mouseover ? 'Stop' : onGoingTime}
								</button>
							)}
						</span>
					)}
				</div>
				{isExpanded && (
					<div className="task-details">
						<select
							name="projectId"
							className="tw-form-elem col-3"
							value={data.projectId}
							onChange={this.onChange}
						>
							<option value="" disabled="true">
								Select
							</option>
							{projects.map((project, index) => (
								<option key={index} value={project.projectId}>
									{project.title}
								</option>
							))}
						</select>
						<select
							name="type"
							className="tw-form-elem"
							value={data.type}
							onChange={this.onChange}
						>
							<option value="Normal">Normal</option>
							<option value="Priority">Priority</option>
							<option value="Optional">Optional</option>
						</select>
						<input
							type="date"
							name="date"
							className="tw-form-elem col-2"
							value={data.date}
							onChange={this.onChange}
						/>
						to
						<input
							type="date"
							name="deadline"
							className="tw-form-elem col-2"
							value={data.deadline}
							onChange={this.onChange}
						/>
						<div>
							<textarea
								name="comments"
								autoFocus="on"
								placeholder="Enter notes for this task here."
								className="tw-form-elem col-9 font--xsmall"
								value={data.comments}
								onChange={this.onChange}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.projectReducer,
	userId: state.sessionReducer.user.userId,
	onGoingTask: state.taskReducer.onGoingTask
});

export default connect(mapStateToProps, {
	getDailyTasks,
	updateTask,
	deleteTask,
	archiveTask,
	startTask,
	stopTask,
	getOnGoingTask
})(TaskListItem);
