
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
	addTask(task) {
		return axios.post(`${this.endPoint}/task`, task);
	}

	/**
	 * Update a task of an employee
	 * @param {string} task - The task to be updated for an employee
	 * @return Returns a promise
	 */
	updateTask(taskId, attribute, value) {
		return axios.put(`${this.endPoint}/task/${taskId}`, {
			attribute: attribute,
			value: value
		});
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

	archiveTask(taskId) {
		return axios.put(`${this.endPoint}/task/${taskId}/archive`);
	}

	pushTask(taskId) {
		return axios.put(`${this.endPoint}/task/${taskId}/push`);
	}
}

export default TaskService;
