import TaskService from './';
import tasksForGivenDate from './tasksForGivenDate.json';

describe('Tasks API', () => {
	let taskService = new TaskService();

	// it('returns the tasks for the given date', (done) => {
	// 	const date = '2018-04-01';
	// 	const userId = '000';
	// 	const tasks = tasksForGivenDate;

	// 	taskService.getDailyTasks(userId, date).then(res => {
	// 		for (let i = 0; i < res.data.length; i++) {
	// 			for (let attribute in res.data[i]) {
	// 				expect(res.data[i][attribute]).toBe(tasks[i][attribute]);
	// 			}
	// 		}
	// 		done();
	// 	});
	// });

	it('does not return the tasks for the given date because not an employee', done => {
		const date = '2018-04-01';
		const userId = '999';
		const tasks = tasksForGivenDate;

		taskService.getDailyTasks(userId, date).then(res => {
			expect(res.data.length).toBe(0);
			done();
		});
	});

	it('creates a new task and returns it with an id', done => {
		const userId = '000';
		const task = {
			title: 'Task A',
			type: 'Priority',
			projectId: 'p001',
			userId: userId,
			comments: 'Comments',
			date: '2018-04-02',
			deadline: ''
		};

		taskService.addTask(task, userId).then(res => {
			for (let attribute in task) {
				expect(res.data[attribute]).toBe(task[attribute]);
			}
			expect(res.data.taskId !== undefined).toBe(true);
			done();
		});
	});

	it('updates an attribute in a task', done => {
		const taskId = 't001';
		const attribute = 'type';
		const value = 'Priority';

		taskService.updateTask(taskId, attribute, value).then(res => {
			expect(res.data.attribute).toBe(attribute);
			expect(res.data.value).toBe(value);
			done();
		});
	});

	it('deletes a task', done => {
		const taskId = 't001';
		const userId = '000';
		const date = '2018-04-01';

		taskService.getDailyTasks(userId, date).then(res => {
			let numberOfTasks = res.data.length;
			// expect(numberOfTasks).toBe(2);

			taskService.deleteTask(taskId).then(res => {
				expect(res.data.taskId).toBe(taskId);

				taskService.getDailyTasks(userId, date).then(res => {
					// expect(res.data.length).toBe(numberOfTasks - 1);
					done();
				});
			});
		});
	});
});
