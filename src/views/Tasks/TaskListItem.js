import React, { Component } from 'react';
import { object, array, func, string } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import {
	addTask,
	getDailyTasks,
	updateTask,
	deleteTask,
	archiveTask,
	startTask,
	stopTask,
	getOnGoingTask
} from '../../actions/tasks';
import { TASK, DATE_FORMAT } from '../../constants';

import { Dropdown, TextIcon } from '../../components';
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

	componentWillMount() {
		let { userId } = this.props;
		this.props.getOnGoingTask(userId).then(() => {
			this.startInterval();
		});
	}

	componentWillUnmount() {
		const { data } = this.state;
		const { userId } = this.props;
		
		if (data.taskId) {
			this.props.updateTask(userId, data.taskId, data);
		}

		clearInterval(this.onGoingInterval);
	}

	onChange = event => {
		let { data } = this.state;
		let { userId } = this.props;
		data[event.target.name] = event.target.value;
		this.setState({ data });

		if (data.taskId) {
			if (event.target.name === 'date') {
				this.props.updateTask(userId, data.taskId, data);
				this.props.getDailyTasks(userId, event.target.date);
				this.props.getDailyTasks(userId, data.date);
			}
		} else {
			if (event.target.name === 'projectId') {
				this.props.addTask(userId, data);
				this.setState({ data: {...this.newTask} });
			}
		}
	};
	
	onMouseEnter = () => { this.setState({ mouseover: true }); };
	onMouseLeave = () => { this.setState({ mouseover: false }); };

	onStartTimer = () => {
		const { taskId } = this.state.data;
		const { userId } = this.props;
		this.props.startTask(userId, taskId).then(() => {
			this.startInterval();	
		});
	};

	onStopTimer = () => {
		const { taskId } = this.state.data;
		const { userId } = this.props;
		this.props.stopTask(userId, taskId).then(() => {
			clearInterval(this.onGoingInterval);
		});
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

	startInterval() {
		let { taskId } = this.state.data;
		let { onGoingTask } = this.props;

		this.setDuration(onGoingTask.start);
		this.onGoingInterval = setInterval(() => {
			this.setDuration(onGoingTask.start);
		}, 1000);
	}

	/**
	 * Helper method for setting the duration of the current time since the given start time
	 * @param {string} startTime
	 */
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
		return moment(date, DATE_FORMAT).isSame(moment())
	}

	get iconAngle() {
		return this.isExpanded ? 'fa-angle-up' : 'fa-angle-down';
	}

	render() {
		let { data, isExpanded, onGoingTime, mouseover } = this.state;
		let { projects } = this.props;
		return (
			<div className="tw-task">
				<span
					className="expand-icon-section"
					onClick={this.toggleExpand}
				>
					{isExpanded ? (
						<i
							className={`fa fa-angle-up`}
						/>
					) : (
						<i
							className={`fa fa-angle-down`}
						/>
					)}
				</span>
				{data.taskId && (
					<span className="right">
						{!this.isOnGoing ? (
							<button
								className={`tw-btn ${!this.canStart ? 'disabled' : ''}`}
								onClick={this.onStartTimer}
								disabled={!this.canStart}
							>
								<TextIcon
									text="Start"
									icon="fa fa-stopwatch"
									iconArrangement="left"
								/>
							</button>
						) : (
							<button
								className="tw-btn on-going-time tw-font-size-medium"
								onClick={this.onStopTimer}
								onMouseEnter={this.onMouseEnter}
								onMouseLeave={this.onMouseLeave}
							>
								{mouseover ? 'Stop' : onGoingTime}
							</button>
						)}
					</span>
				)}
				<span className="properties">
					<div>
						<input
							name="title"
							type="text"
							className="tw-form-elem title tw-font-size-medium"
							placeholder="Some sort of task"
							value={data.title}
							onChange={this.onChange}			
						/>
					</div>
					{isExpanded && (
						<div>
							<label className="tw-highlight-color">
								<span className="tw-font-size-medium">Created</span>
								<input
									type="date"
									name="date"
									className="tw-form-elem tw-font-size-medium"
									value={data.date}
									onChange={this.onChange}
								/>
							</label>
							<label className="tw-highlight-color">
								<span className="tw-font-size-medium">Due</span>
								<input
									type="date"
									name="deadline"
									className="tw-form-elem tw-font-size-medium"
									value={data.deadline}
									onChange={this.onChange}
								/>
							</label>
							<label className="tw-highlight-color">
								<span className="tw-font-size-medium">Type</span>
								<select
									name="type"
									className="tw-form-elem tw-font-size-medium"
									value={data.type}
									onChange={this.onChange}
								>
									<option value="Normal">Normal</option>
									<option value="Priority">Priority</option>
									<option value="Optional">Optional</option>
								</select>
							</label>
							<label className="tw-highlight-color">
								<span className="tw-font-size-medium">Project</span>
								<select
									name="projectId"
									className="tw-form-elem tw-font-size-medium"
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
							</label>
							{/* <Dropdown
								title="Actions"
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
							<div className="details">
								<textarea
									name="comments"
									autoFocus="on"
									placeholder="Enter notes for this task here."
									className="tw-form-elem tw-font-size-medium"
									value={data.comments}
									onChange={this.onChange}
								/>
							</div>
						</div>
					)}
				</span>
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
	addTask,
	getDailyTasks,
	updateTask,
	deleteTask,
	archiveTask,
	startTask,
	stopTask,
	getOnGoingTask
})(TaskListItem);
