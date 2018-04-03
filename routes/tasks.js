const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./dummyData/task.json');
const employeeTaskData = require('./dummyData/employeeTask.json');
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

	for (let i = 0; i < employeeTaskData.length; i++) {
		if (employeeTaskData[i].employeeId == employeeId) {
			for (let j = 0; j < taskData.length; j++) {
				if (date == taskData[j].date && employeeTaskData[i].taskId == taskData[j].taskId) {
					tasks.push(taskData[j]);
					break;
				}
			}
		}
	}

	res.json(tasks);
});

/**
 * Adds a new task to the user's task list
 */
router.post('/api/task', (req, res, next) => {
	let task = req.body.task;
	let employeeId = req.body.employeeId;
	task.taskId = taskIdIncrement;
	taskIdIncrement++;

	taskData.push(task);
	employeeTaskData.push({
		taskId: task.taskId,
		employeeId: employeeId
	});

  res.json(task);
});


/**
 * Updates a task in the user's task list
 */
router.put('/api/task/:taskId', (req, res, next) => {
  let task = req.body;

  // TODO: Update task in the db

  res.json(task);
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

  // TODO: Delete a task in the db

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

module.exports = router;
