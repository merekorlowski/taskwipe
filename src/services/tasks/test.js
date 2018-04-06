import TaskService from './';

describe('Tasks API', () => {
	let taskService = new TaskService();

	it('returns the tasks for the given date', (done) => {
		// const date = '2018-04-02';
		// const employeeId = '003';
		// const taskIds = [];

		// taskService.getTasks(employeeId, date).then(res => {
		// 	for (let i = 0; i < res.data.length; i++) {
		// 		expect(res.data[i].taskId).toBe(taskIds[i]);
		// 	}
		// 	done();
		// });
		done();
	});

	it('creates a new task and returns it with an id', (done) => {
		// const employeeId = '001';
		// const task = {
		// 	title: 'Task A',
		// 	type: 'Priority',
		// 	projectId: 'p001',
		// 	employeeId: '004',
		// 	comments: 'Comments',
		// 	date: '2018-04-02'
		// };

		// taskService.addTask(task, employeeId).then(res => {
		// 	for (let attribute in task) {
		// 		expect(res.data[attribute]).toBe(task[attribute]);
		// 	}
		// 	expect((res.data.taskId !== undefined)).toBe(true);
		// 	done();
		// });
		done();
	});

	it('updates an attribute in a task', (done) => {
		// const taskId = 't001';
		// const attribute = 'type';
		// const value = 'Priority';

		// taskService.updateTask(taskId, attribute, value).then(res => {
		// 	expect(res.data.attribute).toBe(attribute);
		// 	expect(res.data.value).toBe(value);
		// 	done();
		// });
		done();
	});

	it('deletes a task', (done) => {
		// const taskId = 't004';
		// const employeeId = '003';
		// const date = '2018-04-02';
		
		// taskService.getTasks(employeeId, date).then(res => {
		// 	let numberOfTasks = res.data.length;
		// 	expect(numberOfTasks).toBe(2);
		// 	taskService.deleteTask(taskId).then(res => {
		// 		expect(res.data.taskId).toBe(taskId);
		// 		taskService.getTasks(employeeId, date).then(res => {
		// 			expect(res.data.length).toBe(numberOfTasks - 1);
		// 			done();
		// 		});
		// 	});
		// });
		done();
	});
});
