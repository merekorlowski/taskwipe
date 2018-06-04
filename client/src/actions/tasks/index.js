import TaskApi from '../../api/tasks';
import * as types from './types';

export const getDailyTasks = (userId, date) => dispatch => {
	TaskApi
		.getDailyTasks(userId, date)
		.then(res => {
			dispatch({
				type: types.GET_DAILY_TASKS,
				payload: res.data,
				date: date
			});
		})
		.catch(err => {
			throw(err);
		});
};


export const addTask = (userId, data) => dispatch => {
	TaskApi
		.addTask(userId, data)
		.then(res => {
			dispatch({
				type: types.ADD_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};
	
export const updateTask = (userId, taskId, data) => dispatch => {
	TaskApi
		.updateTask(userId, taskId, data)
		.then(res => {
			dispatch({
				type: types.UPDATE_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const deleteTask = (userId, taskId) => dispatch => {
	TaskApi
		.deleteTask(userId, taskId)
		.then(res => {
			dispatch({
				type: types.DELETE_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const archiveTask = (userId, taskId) =>  {
	TaskApi
		.archiveTask(userId, taskId)
		.then(res => {
			dispatch({
				type: types.ARCHIVE_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
}

export const startTask = (userId, taskId) => dispatch => {
	TaskApi
		.startTask(userId, taskId)
		.then(res => {
			dispatch({
				type: types.START_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const stopTask = (userId, taskId) => dispatch => {
	TaskApi
		.stopTask(userId, taskId)
		.then(res => {
			dispatch({
				type: types.STOP_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const getOnGoingTask = (userId) => dispatch => {
	TaskApi
		.getOnGoingTask(userId)
		.then(res => {
			dispatch({
				type: types.GET_ON_GOING_TASK,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const getTaskTimelogs = (userId) => dispatch => {
	TaskApi
		.getTaskTimelogs(userId)
		.then(res => {
			dispatch({
				type: types.GET_TASK_TIMELOGS,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};
