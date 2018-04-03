
import axios from 'axios';
import httpConfig from '../httpConfig.js';

/** Service for handling http requests for the tasks api */
class TaskService {
	/**
	 * Represents a TaskService.
	 * @constructor
	 */
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}

	/**
	 * Return all the tasks for a given employee
	 * @param {string} employeeId - The id of an employee
	 * @param {string} date - The date of the tasks to get
	 * @return Returns a promise
	 */
	getTasks(employeeId, date) {
		return axios.get(`${this.endPoint}/tasks?employeeId=${employeeId}&date=${date}`);
	}

	getOnGoingTimeLog(taskId) {
		return axios.get(`${this.endPoint}/task/${taskId}/ongoing-timelog`);
	}

	/**
	 * Add a task to an employee
	 * @param {string} task - The task to add to an employee
	 * @return Returns a promise
	 */
	addTask(task, employeeId) {
		return axios.post(`${this.endPoint}/task`, {
			task: task,
			employeeId: employeeId
		});
	}

	/**
	 * Update a task of an employee
	 * @param {string} task - The task to be updated for an employee
	 * @return Returns a promise
	 */
	updateTask(task) {
		return axios.put(`${this.endPoint}/task/${task.taskId}`, task);
	}

	/**
	 * Delete a task from an employee
	 * @param {string} taskId - The id of the task to be deleted from an employee
	 * @return Returns a promise
	 */
	deleteTask(taskId) {
		return axios.delete(`${this.endPoint}/task/${taskId}`);
	}

	/**
	 * Retrieves the time logs for a task
	 * @param {string} taskId - The id of the task
	 * @return Returns a promise
	 */
	getTimeLogs(taskId) {
		return axios.get(`${this.endPoint}/task/${taskId}/timelogs`);
	}

	/**
	 * Retrieves the comments for a task
	 * @param {string} taskId - The id of the task
	 * @return Returns a promise
	 */
	getComments(taskId) {
		return axios.get(`${this.endPoint}/task/${taskId}/comments`);
	}

	/**
	 * Starts the timer of a task
	 * @param {string} taskId - The id of the task
	 * @return Returns a promise
	 */
	startTimer(taskId) {
		return axios.post(`${this.endPoint}/task/${taskId}/start`);
	}

	/**
	 * Stops the timer of a task
	 * @param {string} taskId - The id of the task
	 * @return Returns a promise
	 */
	stopTimer(taskId) {
		return axios.post(`${this.endPoint}/task/${taskId}/stop`);
	}

	/**
	 * Adds a comment to a task
	 * @param {string} taskId - The id of the task
	 * @return Returns a promise
	 */
	addComment(taskId, comment) {
		return axios.post(`${this.endPoint}/task/${taskId}/comment`, {
			comment: comment
		});
	}

	/**
	 * Deletes a comment from a task
	 * @param {string} taskId - The id of the task to be deleted from an employee
	 * @return Returns a promise
	 */
	deleteComment(taskId, commentId) {
		return axios.delete(`${this.endPoint}/task/${taskId}/comment/${commentId}`);
	}
}

export default TaskService;
