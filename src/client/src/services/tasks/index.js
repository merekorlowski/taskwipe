
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
	 * @return Returns a promise
	 */
	getTasks(employeeId) {
		return axios.get(`${this.endPoint}/tasks?employeeId=${employeeId}`);
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
	updateTask(task) {
		return axios.put(`${this.endPoint}/task`, task);
	}

	/**
	 * Delete a task from an employee
	 * @param {string} taskId - The id of the task to be deleted from an employee
	 * @return Returns a promise
	 */
	deleteTask(taskId) {
		return axios.delete(`${this.endPoint}/task`, {taskId: taskId});
	}
}

export default TaskService;
