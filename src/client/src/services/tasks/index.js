
import axios from 'axios';
import httpConfig from '../httpConfig.js';

export default class TaskService {
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}

	getTasks(employeeId) {
		return axios.get(`${this.endPoint}/tasks?employeeId=${employeeId}`);
	}

	addTask(task) {
		return axios.post(`${this.endPoint}/task`, task);
	}

	updateTask(task) {
		return axios.put(`${this.endPoint}/task`, task);
	}

	deleteTask(taskId) {
		return axios.put(`${this.endPoint}/task`, {taskId: taskId});
	}
}
