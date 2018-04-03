import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TaskService from '../../services/tasks';
import ProjectService from '../../services/projects';
import moment from 'moment';

class TaskListItem extends Component {
	/**
	 * A Task
	 * @constructor
	 * @param {JSON} props
	 */
	constructor(props) {
		super(props);
		let task = this.props.data;
		this.state = {
			taskId: task.taskId,
			title: task.title,
			type: task.type,
			projectId: task.projectId,
			comments: task.comments,
			projects: [],
			onGoingTime: null,
			isExpanded: false,
			mouseover: false
		};
	}

	/**
	 * Static getter for validating the properties passed into this component
	 */
	static get propTypes() {
		return {
			data: PropTypes.any.isRequired,
			handleDelete: PropTypes.func.isRequired,
			handleArchive: PropTypes.func.isRequired,
			handlePush: PropTypes.func.isRequired,
			checkIfCanStart: PropTypes.func.isRequired,
			setOnGoingTask: PropTypes.func.isRequired,
			removeOnGoingTask: PropTypes.func.isRequired
		};
	};

	componentDidMount() {
		this.taskService = new TaskService();
		this.projectService = new ProjectService();
		this.getOnGoingTimeLog();
		this.getProjects();
	}

	/**
	 * Renders the task list item
	 */
	render() {
		return (
			<div className="container">
				<span className="col-md-5 col-lg-5 col-sm-12" onClick={this.toggleExpand.bind(this)}>
					<i className={`fa ${this.state.isExpanded ? 'fa-angle-up' : 'fa-angle-down'} expand-icon`}></i>
					<strong>{this.state.title}</strong>
				</span>
				<span className="col-md-3 col-lg-3 col-sm-5">
					<select name="projectId" className="form-elem" value={this.state.projectId} onChange={this.handleChange.bind(this)}>
						{this.state.projects.map((project, index) => (
							<option key={index} value={project.projectId}>{project.title}</option>
						))}
					</select>
				</span>
				<span className="col-md-2 col-lg-2 col-sm-3">
					<select name="type" className="form-elem" value={this.state.type} onChange={this.handleChange.bind(this)}>
						<option value="Priority">Priority</option>
						<option value="Push">Push</option>
						<option value="Archive">Archive</option>
						<option value="Optional">Optional</option>
						<option value="Delete">Delete</option>
					</select>
				</span>
				<span className="col-md-1 col-lg-1 col-sm-2">
					{this.state.onGoingTime === null
						? (<button className={`bg-theme-btn ${!this.checkIfCanStart ? 'disabled-btn' : ''}`}
							onClick={this.startTimer.bind(this)} disabled={!this.checkIfCanStart}>Start</button>)
						: (<button className="bg-theme-btn on-going-time"
							onClick={this.stopTimer.bind(this)}
							onMouseEnter={this.onMouseEnter.bind(this)}
							onMouseLeave={this.onMouseLeave.bind(this)}>
							{this.state.mouseover ? 'Stop' : this.state.onGoingTime}
						</button>)}
				</span>
				{this.state.isExpanded
					? (
						<div className="col-xs-11 list-elem-details">
							<textarea name="comments" rows="50" autoFocus="on" placeholder="Notes"
								value={this.state.comments} onChange={this.handleChange.bind(this)}></textarea>
						</div>
					) : ''
				}
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleChange(event) {
		if (event.target.name === 'type' && event.target.value === 'Delete') {
			this.handleDelete();
		} else if (event.target.name === 'type' && event.target.value === 'Archive') {
			this.handleArchive();
		} else {
			this.taskService.updateTask(this.state.taskId, event.target.name, event.target.value).then(res => {
				this.setState({
					[res.data.attribute]: res.data.value
				});
			}).catch(err => {
				console.error(err.message);
			});
		}
	}

	/**
	 * Calls the parent's function to handle deleting this task
	 */
	handleDelete() {
		this.props.handleDelete();
	}

	handleArchive() {
		this.props.handleArchive();
	}

	handlePush() {
		this.props.handlePush();
	}

	/**
	 * Getter that calls the parent's function to verify if the user can start this task
	 */
	get checkIfCanStart() {
		return this.props.checkIfCanStart();
	}
	
	/**
	 * Toggles the expand feature of the task
	 */
	toggleExpand() {
		let isExpanded = this.state.isExpanded;
		this.setState({isExpanded: !isExpanded});
	}

	/**
	 * Update the mouseover flag when the user moves the mouse over of the timer button
	 */
	onMouseEnter() {
		this.setState({mouseover: true});
	}

	/**
	 * Update the mouseover flag when the user moves the mouse off of the timer button
	 */
	onMouseLeave() {
		this.setState({mouseover: false});
	}

	/**
	 * Retrieves the last started time and starts an interval to display current time in minutes
	 */
	getOnGoingTimeLog() {
		this.taskService.getOnGoingTimeLog(this.state.taskId).then(res => {
			if (res.data.startTime) {
				this.props.setOnGoingTask(this.state.taskId);
				this.setDuration(res.data.startTime);
				this.onGoingInterval = setInterval(() => {
					this.setDuration(res.data.startTime);
				}, 1000);
			}
		}).catch(err => {
			console.error(err.message);
		});
	}

	getProjects() {
		this.projectService.getProjects(localStorage.getItem('employeeId')).then(res => {
			this.setState({projects: res.data});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Retrieves all of the time logs for this task
	 */
	getTimeLogs() {
		this.taskService.getTimeLogs(this.state.taskId).then(res => {
			this.setState({timeLogs: res.data});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Starts a new timer
	 */
	startTimer() {
		this.taskService.startTimer(this.state.taskId).then(res => {
			this.props.setOnGoingTask(this.state.taskId);
			this.setDuration(res.data.startTime);
			this.onGoingInterval = setInterval(() => {
				this.setDuration(res.data.startTime);
			}, 1000);
			this.setState({mouseover: true});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Stops the current running timer
	 */
	stopTimer() {
		this.taskService.stopTimer(this.state.taskId).then(res => {
			this.props.removeOnGoingTask();
			this.setState({
				onGoingTime: null
			});
			clearInterval(this.onGoingInterval);
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Helper method for setting the duration of the current time since the given start time
	 * @param {string} startTime
	 */
	setDuration(startTime) {
		let ms = moment().diff(moment(startTime, 'YYYY-MM-DD HH:mm:ss'));
		let d = moment.duration(ms);
		let s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');

		this.setState({
			onGoingTime: s
		});
	}

	/**
	 * Used for sending the JSON of this task to the server
	 */
	toJSON() {
		return {
			taskId: this.state.taskId,
			title: this.state.title,
			type: this.state.type,
			projectId: this.state.projectId,
			comments: this.state.comments
		};
	}
}

export default TaskListItem;
