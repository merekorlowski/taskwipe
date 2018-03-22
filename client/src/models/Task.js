import TaskService from '../services/tasks';
import moment from 'moment';

const DEFAULT_TYPE = 'Priority';

class Task {
	/**
	 * A Task
	 * @constructor
	 * @param {JSON} task
	 */
	constructor(task) {
		// casts the JSON retrieved from the server into a Task object
		if (task) {
			this.taskId = task.taskId;
			this.title = task.title;
			this.type = task.type;
			this.projectId = task.projectId;
		} else {
			this.title = '';
			this.type = DEFAULT_TYPE;
			this.projectId = '';
		}
		this.timeLogs = [];
		this.comments = [];
		this.onGoingTime = '';

		this.taskService = new TaskService();
		this.getOnGoingTimeLog();
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
		this.taskService.getTimeLogs(this.taskId).then(res => {
			this.timeLogs = res.data;
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Retrieves all of the comments for this task
	 */
	getComments() {
		this.taskService.getComments(this.taskId).then(res => {
			this.comments = res.data;
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Starts a new timer 
	 */
	startTimer(parent) {
		this.taskService.startTimer(this.taskId).then(res => {
			setInterval(() => {
				let startTime = moment(res.data.startTime, 'YYYY-MM-DD HH:mm:ss');
				let currentTime = moment();
				let duration = moment.duration(currentTime.diff(startTime));
				let tasks = [...parent.state.tasks];
				this.onGoingTime = duration.asMinutes();
				parent.setState({tasks: tasks});
			}, 1000);
			//this.timeLogs.push(res.data);
		}).catch(err => {
			console.error(err);	
		});
	}

	/**
	 * Stops the current running timer 
	 */
	stopTimer() {
		this.taskService.stopTimer(this.taskId).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Add a comment to this task
	 * @param {string} comment - The comment to add to this task
	 */
	addComment(comment) {
		this.taskService.addComment(this.taskId, comment).then(res => {
			this.comments.push(res.data);
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
		this.taskService.deleteComment(this.taskId, this.commentId).then(res => {
			this.comments.splice(index, 1);
		}).catch(err => {
			console.error(err);
		});
	}

	toJSON() {
		return {
			taskId: this.taskId,
			title: this.title,
			type: this.type,
			projectId: this.projectId
		}
	}
	
}

export default Task;
