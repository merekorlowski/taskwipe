const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./dummyData/task.json');
const projectData = require('./dummyData/project.json');
let taskIdIncrement = 1;
let onGoingTaskId = null;
let startTime = null;

/**
 * Returns all of the tasks for a given user
 */
router.get('/api/tasks', (req, res, next) => {
	let employeeId = req.query.employeeId;
	let date = req.query.date;

	let tasks = [];

	for (let i = 0; i < taskData.length; i++) {
		if (date == taskData[i].date && employeeId == taskData[i].employeeId) {
			tasks.push(taskData[i]);
		}
	}

	res.json(tasks);
});

/**
 * Adds a new task to the user's task list
 */
router.post('/api/task', (req, res, next) => {
	let task = req.body;
	task.taskId = taskIdIncrement;
	taskIdIncrement++;

	taskData.push(task);

  res.json(task);
});


/**
 * Updates a task in the user's task list
 */
router.put('/api/task/:taskId', (req, res, next) => {
	let taskId = req.params.taskId;
	let attribute = req.body.attribute;
	let value = req.body.value;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i][attribute] = value;
			break;
		}
	}

  res.json({
		attribute: attribute,
		value: value
	});
});

/**
 * Deletes a task from the user's task list
 */
router.delete('/api/task/:taskId', (req, res, next) => {
	let taskId = req.params.taskId;
	
	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData.splice(i, 1);
			break;
		}
	}

  res.json({taskId: taskId});
});

/**
 * Gets the current time log
 */
router.get('/api/task/:taskId/ongoing-timelog', (req, res, next) => {
	if (req.params.taskId === onGoingTaskId) {
		res.json({
			taskId: onGoingTaskId,
			startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
		});
	} else {
		res.json({});
	}
});

/**
 * Starts a timer for a task
 */
router.post('/api/task/:taskId/start', (req, res, next) => {
	let taskId = req.params.taskId;
	startTime = moment();

	onGoingTaskId = taskId;

  res.json({
		taskId: taskId,
		startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
	});
});

/**
 * Stops a timer for a task
 */
router.post('/api/task/:taskId/stop', (req, res, next) => {
	let taskId = req.params.taskId;

	onGoingTaskId = null;

  res.json({
		taskId: taskId
	});
});

/**
 * Archives a task into a project comment
 */
router.put('/api/task/:taskId/archive', (req, res) => {
	let taskId = req.params.taskId;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			for (let j = 0; j < projectData.length; j++) {
				if (taskData[i].projectId == projectData[j].projectId) {
					projectData[j].comments +=  ((projectData[j].comments ? '\n- ' : '- ') +  taskData[i].title);
					taskData.splice(i, 1);
					break;
				}
			}
		}
	}

	res.json(taskId);
});

/**
 * Pushes a task to the next day
 */
router.put('/api/task/:taskId/push', (req, res) => {
	let taskId = req.params.taskId;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i].date = moment(taskData[i].date, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD');
		}
	}

	res.json(taskId);
});

module.exports = router;
