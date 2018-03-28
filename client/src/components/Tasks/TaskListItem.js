import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TaskService from '../../services/tasks';
import moment from 'moment';

const DEFAULT_TYPE = 'Priority';

class TaskListItem extends Component {
	/**
	 * A Task
	 * @constructor
	 * @param {JSON} props
	 */
	constructor(props) {
		super(props);
		let task = this.props.data;
		this.state = {};
		// casts the JSON retrieved from the server into a Task object
		if (task) {
			this.state.taskId = task.taskId;
			this.state.title = task.title;
			this.state.type = task.type;
			this.state.projectId = task.projectId;
			this.state.comments = task.comments;
		} else {
			this.state.title = '';
			this.state.type = DEFAULT_TYPE;
			this.state.projectId = '';
			this.state.comments = 'Write comments here...';
		}
		this.state.timeLogs = [];
		this.state.onGoingTime = null;
		this.state.isExpanded = false;
		this.onGoingInterval = null;
		this.state.mouseover = false;

		this.taskService = new TaskService();
		this.getOnGoingTimeLog();
	}

	static get propTypes() {
		return {
			data: PropTypes.any.event.isRequired,
			handleDelete: PropTypes.func.isRequired,
			checkIfCanStart: PropTypes.func.isRequired,
			setOnGoingTask: PropTypes.func.isRequired,
			removeOnGoingTask: PropTypes.func.isRequired
		};
	};

	render() {
		return (
			<div className="container">
				<span className="col-md-5 col-lg-5 col-sm-12" onClick={this.toggleExpand.bind(this)}>
					<i className={`fa ${this.state.isExpanded ? 'fa-angle-up' : 'fa-angle-down'} task-expand-icon`}></i>
					{this.state.title}
				</span>
				<span className="col-md-3 col-lg-3 col-sm-5">
					<select name="projectId" className="form-elem" value={this.state.projectId} onChange={this.handleChange.bind(this)}>
						<option value="Capstone">Capstone</option>
						<option value="P1">P1</option>
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
							<textarea name="comments" rows="50" autoFocus="on" value={this.state.comments} onChange={this.handleChange.bind(this)}></textarea>
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
		} else {
			this.setState({
				[event.target.name]: event.target.value
			});
		}
	}

	handleDelete() {
		this.props.handleDelete();
	}

	get checkIfCanStart() {
		return this.props.checkIfCanStart();
	}
	
	toggleExpand() {
		let isExpanded = this.state.isExpanded;
		this.setState({isExpanded: !isExpanded});
	}

	onMouseEnter() {
		this.setState({mouseover: true});
	}

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
				this.setState({
					onGoingTime: this.getDuration(res.data.startTime)
				});
				this.onGoingInterval = setInterval(() => {
					this.setState({
						onGoingTime: this.getDuration(res.data.startTime)
					});
				}, 1000);
			}
		});
	}

	/**
	 * Retrieves all of the time logs for this task
	 */
	getTimeLogs() {
		this.taskService.getTimeLogs(this.state.taskId).then(res => {
			this.setState({timeLogs: res.data});
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Starts a new timer
	 */
	startTimer() {
		this.taskService.startTimer(this.state.taskId).then(res => {
			this.props.setOnGoingTask(this.state.taskId);
			this.setState({
				onGoingTime: this.getDuration(res.data.startTime)
			});
			this.onGoingInterval = setInterval(() => {
				this.setState({
					onGoingTime: this.getDuration(res.data.startTime)
				});
			}, 1000);
			this.state.timeLogs.push(res.data);
		}).catch(err => {
			console.error(err);
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
			console.error(err);
		});
	}

	getDuration(startTime) {
		let ms = moment().diff(moment(startTime, 'YYYY-MM-DD HH:mm:ss'));
		let d = moment.duration(ms);
		let s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');

		return s;
	}

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
