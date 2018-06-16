import axios from 'axios';
import { endPoint } from '../config';

class TaskApi {
	static getDailyTasks(userId, date) {
		return axios
			.get(`${endPoint}/user/${userId}/tasks?date=${date}`)
			.catch(err => err);
	}

	static getOnGoingTask(userId) {
		return axios
			.get(`${endPoint}/user/${userId}/task/ongoing`)
			.catch(err => err);
	}

	static addTask(userId, data) {
		return axios
			.post(`${endPoint}/user/${userId}/task`, data)
			.catch(err => err);
	}

	static updateTask(userId, taskId, data) {
		return axios
			.put(`${endPoint}/user/${userId}/task/${taskId}`, data)
			.catch(err => err);
	}

	static deleteTask(userId, taskId) {
		return axios
			.delete(`${endPoint}/user/${userId}/task/${taskId}`)
			.catch(err => err);
	}

	static getTimeLogs(userId, taskId) {
		return axios
			.get(`${endPoint}/user/${userId}/task/${taskId}/timelogs`)
			.catch(err => err);
	}

	static startTask(userId, taskId) {
		return axios
			.post(`${endPoint}/user/${userId}/task/${taskId}/start`)
			.catch(err => err);
	}

	static stopTask(userId, taskId) {
		return axios
			.post(`${endPoint}/user/${userId}/task/${taskId}/stop`)
			.catch(err => err);
	}

	static archiveTask(userId, taskId) {
		return axios
			.put(`${endPoint}/user/${userId}/task/${taskId}/archive`)
			.catch(err => err);
	}

	static getTimelogs(day, hour) {
		return axios
			.get(`${endPoint}/task/timelogs?day=${day}&hour=${hour}`)
			.catch(err => err);
	}
}

export default TaskApi;
