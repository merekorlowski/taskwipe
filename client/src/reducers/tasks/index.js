import * as types from '../../actions/tasks/types';

const initialState = {
	tasks: {},
	onGoingTask: null
};

const taskReducer = (state = initialState, action) => {
	let tasks = {...state.tasks};
	switch (action.type) {
		case types.GET_DAILY_TASKS:
			tasks[action.date] = action.payload;
			return {
				...state,
				tasks
			};

		case types.ADD_TASK:
			const newTask = action.payload;
			if (tasks[newTask.date]) {
				tasks[newTask.date].push(newTask);
			} else {
				tasks[newTask.date] = [
					newTask
				];
			}
			return {
				...state,
				tasks
			}

			return result;

		case types.UPDATE_TASK:
			return state;

		case types.DELETE_TASK:
			return state;

		case types.ARCHIVE_TASK:
			return state;

		case types.START_TASK:
			return {
				...state,
				onGoingTask: action.payload
			};
			
		case types.STOP_TASK:
			return {
				...state,
				onGoingTask: null
			};

		case types.GET_ON_GOING_TASK:
			return {
				...state,
				onGoingTask: action.payload
			}

		case types.GET_TASK_TIMELOGS:
			return {
				...state,
				onGoingTask: action.payload
			}
			
		default:
			return state;
	}
};

export default taskReducer;
