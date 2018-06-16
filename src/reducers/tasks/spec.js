import taskReducer from './';
import * as types from '../../actions/tasks/types';

describe('Task Reducer', () => {
	const tasks = {
		'2018-01-01': [
			{
				userId: '001',
				taskId: '001',
				title: 'Task A',
				type: 'Priority',
				date: '2018-01-01',
				deadline: '2018-01-03',
				comments: ''
			},
			{
				userId: '001',
				taskId: '002',
				title: 'Task B',
				type: 'Normal',
				date: '2018-01-01',
				deadline: '',
				comments: 'Various comments regarding this task.'
			},
			{
				userId: '001',
				taskId: '003',
				title: 'Task C',
				type: 'Optional',
				date: '2018-01-01',
				deadline: '',
				comments: 'Various comments regarding this task.'
			}
		],
		'2018-01-02': [
			{
				userId: '001',
				taskId: '004',
				title: 'Task A',
				type: 'Priority',
				date: '2018-01-02',
				deadline: '2018-01-03',
				comments: ''
			},
			{
				userId: '001',
				taskId: '005',
				title: 'Task B',
				type: 'Normal',
				date: '2018-01-02',
				deadline: '',
				comments: 'Various comments regarding this task.'
			},
			{
				userId: '001',
				taskId: '006',
				title: 'Task C',
				type: 'Optional',
				date: '2018-01-02',
				deadline: '',
				comments: 'Various comments regarding this task.'
			}
		]
	};

	it('GET_DAILY_TASKS: returns a list of tasks for a given date', done => {
		const state = {
			tasks: {},
			onGoingTask: null
		};

		const date = '2018-01-01';

		const action = {
			type: types.GET_DAILY_TASKS,
			payload: [...tasks[date]],
			date
		};

		const result = taskReducer(state, action);
		state.tasks[date] = [...tasks[date]];

		expect(result).toEqual(state);
		done();
	});

	it('ADD_TASK: returns the list of tasks with a new task appended to it ', done => {
		const state = {
			tasks: {},
			onGoingTask: null
		};

		const date = '2018-01-02';

		const taskToBeAdded = {
			userId: '001',
			title: 'Task C',
			type: 'Optional',
			date: date,
			deadline: '',
			comments: 'Various comments regarding this task.'
		};

		const addedTask = {...taskToBeAdded, taskId: '001'};

		const action = {
			type: types.ADD_TASK,
			payload: addedTask,
			date
		};

		const resultNoDailyTasks = taskReducer(state, action);

		const expectedNoDailyTasks = {
			tasks: {
				[date]: [addedTask]
			},
			onGoingTask: null
		};

		expect(resultNoDailyTasks).toEqual(expectedNoDailyTasks);
		expect(resultNoDailyTasks.tasks[date].length).toEqual(1);

		state.tasks = { [date]: [...tasks[date]] };

		const resultHasDailyTasks = taskReducer(state, action);

		const expectedHasDailyTasks = {
			tasks: {
				[date]: [
					...tasks[date],
					addedTask
				]
			},
			onGoingTask: null
		};

		expect(resultHasDailyTasks).toEqual(expectedHasDailyTasks);
		expect(resultHasDailyTasks.tasks[date].length).toEqual(tasks[date].length + 1);

		done();
	});
});
