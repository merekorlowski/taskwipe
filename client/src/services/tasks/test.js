import TaskService from './';
import axios from 'axios';

describe('Tasks API', () => {

	let taskService = new TaskService();

	it('Returns the tasks for the given date.', (done) => {

		const date = '2018-04-02';
		const employeeId = '003';
		const taskIds = ['t004', 't005'];

		taskService.getTasks(employeeId, date).then(res => {
			for (let i = 0; i < res.data.length; i++) {
				expect(res.data[i].taskId).toBe(taskIds[i]);
			}
			done();
		});
	});
});
