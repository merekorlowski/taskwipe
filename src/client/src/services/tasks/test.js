import React from 'react';
import axios from 'axios';
import TaskService from './index';

describe('Get tasks', () => {
    it('Returns the tasks for a given employee.', () => {
        let taskService = new TaskService();
        taskService.getTasks('e1').then(res => {
            let tasks = res.data;

            expect(tasks[0].title).toEqual('Task 1');
        });
    });
});
