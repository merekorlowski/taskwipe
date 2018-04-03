import React from 'react';
import ReactDOM from 'react-dom';
import DailyTasks from './DailyTasks';
import TaskListItem from '../Tasks/TaskListItem';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import 'jasmine-local-storage';

configure({adapter: new Adapter()});

beforeEach(() => {
	mockLocalStorage();
});

describe('DailyTasks Component Tests', () => {
	it('renders tasks for employee 003 on the date 2018-04-02', (done) => {
		localStorage.setItem('employeeId', '003');
		const date = '2018-04-02';
		const tasks = [
			{
				"taskId": "t004",
				"title": "Task 4",
				"type": "Priority",
				"projectId": "p001",
				"comments": "Comments regarding task 4",
				"date": "2018-04-02"
			},
			{
				"taskId": "t005",
				"title": "Task 5",
				"type": "Priority",
				"projectId": "p002",
				"comments": "Comments regarding task 5",
				"date": "2018-04-02"
			}
		];


		const wrapper = mount(
			<DailyTasks
				date={date}
				tasks={tasks}
			/>
		)
		expect(wrapper.find(DailyTasks)).toHaveLength(1);
		expect(wrapper.find(TaskListItem)).toHaveLength(2);
		done();
	});
});
