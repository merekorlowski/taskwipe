import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import TaskService from '../../services/tasks';
import ProjectService from '../../services/projects';
import './styles.scss';

class TaskListItem extends Component {
	/**
	 * A Task
	 * @constructor
	 * @param {JSON} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			projects: [],
			onGoingTime: null,
			isExpanded: false,
			mouseover: false
		};
		this.taskService = new TaskService();
		this.projectService = new ProjectService();
	}

	/**
	 * Static getter for validating the properties passed into this component
	 */
	static get propTypes() {
		return {
			data: PropTypes.any.isRequired,
			handleDelete: PropTypes.func.isRequired,
			handleArchive: PropTypes.func.isRequired,
			checkIfCanStart: PropTypes.func.isRequired,
			setOnGoingTask: PropTypes.func.isRequired,
			removeOnGoingTask: PropTypes.func.isRequired
		};
	}

	componentDidMount() {
		this.getOnGoingTimeLog();
		this.getProjects();
	}

	/**
	 * Renders the task list item
	 */
	render() {
		let { data, isExpanded, onGoingTime, projects, mouseover } = this.state;
		return (
			<div className={`task-list-item ${isExpanded ? 'expanded' : ''}`}>
				<div>
					<span
						className="expand-icon-section left"
						onClick={this.toggleExpand}
					>
						<i
							className={`fa fa-angle-${
								isExpanded ? 'up' : 'down'
							} expand-icon`}
						/>
					</span>
					<span>{data.title}</span>
					<span className="right">
						{onGoingTime === null ? (
							<button
								className={`btn ${!this.checkIfCanStart ? 'disabled-btn' : ''}`}
								onClick={this.startTimer}
								disabled={!this.checkIfCanStart}
							>
								Start
							</button>
						) : (
							<button
								className="btn on-going-time"
								onClick={this.stopTimer}
								onMouseEnter={this.onMouseEnter}
								onMouseLeave={this.onMouseLeave}
							>
								{mouseover ? 'Stop' : onGoingTime}
							</button>
						)}
					</span>
				</div>
				<div>
					<input
						type="date"
						name="date"
						className="form-elem"
						value={data.date}
						onChange={this.onChange}
					/>
					<input
						type="date"
						name="deadline"
						className="form-elem"
						value={data.deadline}
						onChange={this.onChange}
					/>
					<select
						name="type"
						className="form-elem"
						value={data.type}
						onChange={this.onChange}
					>
						<option value="Priority">Priority</option>
						<option value="Archive">Archive</option>
						<option value="Optional">Optional</option>
						<option value="Delete">Delete</option>
					</select>
					<select
						name="projectId"
						className="form-elem"
						value={data.projectId}
						onChange={this.onChange}
					>
						{projects.map((project, index) => (
							<option key={index} value={project.projectId}>
								{project.title}
							</option>
						))}
					</select>
				</div>
				{isExpanded && (
					<div className="list-elem-details">
						<textarea
							name="comments"
							autoFocus="on"
							placeholder="Notes"
							value={data.comments}
							onChange={this.onChange}
						/>
					</div>
				)}
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onChange = event => {
		if (event.target.name === 'type' && event.target.value === 'Delete') {
			this.onDelete();
		} else if (
			event.target.name === 'type' &&
			event.target.value === 'Archive'
		) {
			this.onArchive();
		} else {
			this.updateTask(event.target.name, event.target.value);
		}
	};

	/**
	 * Calls the parent's function to handle deleting this task
	 */
	onDelete = () => {
		this.props.handleDelete();
	};

	onArchive = () => {
		this.props.handleArchive();
	};

	/**
	 * Getter that calls the parent's function to verify if the user can start this task
	 */
	checkIfCanStart = () => {
		return this.props.checkIfCanStart();
	};

	/**
	 * Toggles the expand feature of the task
	 */
	toggleExpand = () => {
		let isExpanded = this.state.isExpanded;
		this.setState({ isExpanded: !isExpanded });
	};

	/**
	 * Update the mouseover flag when the user moves the mouse over of the timer button
	 */
	onMouseEnter = () => {
		this.setState({ mouseover: true });
	};

	/**
	 * Update the mouseover flag when the user moves the mouse off of the timer button
	 */
	onMouseLeave = () => {
		this.setState({ mouseover: false });
	};

	/**
	 * Retrieves the last started time and starts an interval to display current time in minutes
	 */
	getOnGoingTimeLog() {
		this.taskService
			.getOnGoingTimeLog(this.state.taskId)
			.then(res => {
				if (res.data.startTime) {
					this.props.setOnGoingTask(this.state.taskId);
					this.setDuration(res.data.startTime);
					this.onGoingInterval = setInterval(() => {
						this.setDuration(res.data.startTime);
					}, 1000);
				}
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	getProjects() {
		this.projectService
			.getProjects(localStorage.getItem('employeeId'))
			.then(res => {
				this.setState({ projects: res.data });
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Starts a new timer
	 */
	startTimer() {
		this.taskService
			.startTimer(this.state.taskId)
			.then(res => {
				this.props.setOnGoingTask(this.state.taskId);
				this.setDuration(res.data.startTime);
				this.onGoingInterval = setInterval(() => {
					this.setDuration(res.data.startTime);
				}, 1000);
				this.setState({ mouseover: true });
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Stops the current running timer
	 */
	stopTimer() {
		this.taskService
			.stopTimer(this.state.taskId)
			.then(res => {
				this.props.removeOnGoingTask();
				this.setState({
					onGoingTime: null
				});
				clearInterval(this.onGoingInterval);
			})
			.catch(err => {
				console.error(err.message);
			});
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

	updateTask(attribute, value) {
		this.taskService
			.updateTask(this.state.taskId, attribute, value)
			.then(res => {
				let { data } = this.state;
				data[res.data.attribute] = res.data.value;
				this.setState({
					data
				});
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Used for sending the JSON of this task to the server
	 */
	toJSON() {
		return this.state.data;
	}
}

export default TaskListItem;
