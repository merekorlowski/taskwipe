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
		} else {
			this.state.title = '';
			this.state.type = DEFAULT_TYPE;
			this.state.projectId = '';
		}
		this.state.timeLogs = [];
		this.state.comments = [];
		this.state.onGoingTime = null;

		this.taskService = new TaskService();
		this.getOnGoingTimeLog();
	}

	static get propTypes() {
		return {
			data: PropTypes.object.isOptional,
			handleDelete: PropTypes.func.isRequired
		};
	};

	render() {
		return (
			<div className="container">
				<span className="col-xs-2 col-lg-3">{this.state.title}</span>
				<span>
					<span className="col-xs-1">
						<i className="fa fa-angle-down"></i>
					</span>
					<span className="col-xs-1" >
						<i className="fa fa-comment"></i>
					</span>
					<span className="col-xs-1">
						<i className="fa fa-edit"></i>
					</span>
					<span className="col-xs-1" onClick={this.handleDelete.bind(this)}>
						<i className="fa fa-times"></i>
					</span>
				</span>
				<span className="col-xs-2">
					<select name="projectId" className="form-elem" value={this.state.projectId} onChange={this.handleChange.bind(this)}>
						<option value="Capstone">Capstone</option>
						<option value="P1">P1</option>
					</select>
				</span>
				<span className="col-xs-2">
					<select name="type" className="form-elem" value={this.state.type} onChange={this.handleChange.bind(this)}>
						<option value="Priority">Priority</option>
						<option value="Push">Push</option>
						<option value="Archive">Archive</option>
						<option value="Optional">Optional</option>
					</select>
				</span>
				<span className="col-xs-1">
					{this.state.onGoingTime === null
						? (<button className="bg-theme-btn" onClick={this.startTimer.bind(this)}>Start</button>)
						: (<button className="bg-theme-btn" onClick={this.stopTimer.bind(this)}>{this.state.onGoingTime}</button>)}
				</span>
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleDelete() {
		this.props.handleDelete();
	}

	/**
	 * Retrieves the last started time and starts an interval to display current time in minutes
	 */
	getOnGoingTimeLog() {
		// this.taskService.getOnGoingTimeLog(this.taskId).then(res => {
		// 	// update every minute
		// 	setInterval(() => {
		// 		let duration = moment.duration(moment().diff(res.data.startTime));
		// 		this.onGoingTime = duration.asMinutes();
		// 	}, 60000);
		// });
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
	 * Retrieves all of the comments for this task
	 */
	getComments() {
		this.taskService.getComments(this.state.taskId).then(res => {
			this.setState({comments: res.data});
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Starts a new timer
	 */
	startTimer() {
		this.taskService.startTimer(this.state.taskId).then(res => {
			setInterval(() => {
				let startTime = moment(res.data.startTime, 'YYYY-MM-DD HH:mm:ss');
				let currentTime = moment();
				let duration = moment.duration(currentTime.diff(startTime));
				this.setState({
					onGoingTime: Math.floor(duration.asMinutes())
				});
			}, 60000);
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
			this.setState({
				onGoingTime: null
			});
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Add a comment to this task
	 * @param {string} comment - The comment to add to this task
	 */
	addComment(comment) {
		this.taskService.addComment(this.state.taskId, comment).then(res => {
			this.state.comments.push(res.data);
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Remove a comment from this task
	 * @param {string} commentId - The id of the comment to remove from this task
	 * @param {number} index - The index of the comment to remove from this task
	 */
	deleteComment(commentId, index) {
		this.taskService.deleteComment(this.state.taskId, commentId).then(res => {
			this.state.comments.splice(index, 1);
		}).catch(err => {
			console.error(err);
		});
	}

	toJSON() {
		return {
			taskId: this.state.taskId,
			title: this.state.title,
			type: this.state.type,
			projectId: this.state.projectId
		};
	}
}

export default TaskListItem;
