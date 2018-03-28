const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./taskData.json');
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
		if (date == taskData[i].date) {
			tasks.push(taskData[i]);
		}
	}

  // TODO: Get all tasks from the db for a specific user

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

  // TODO: Add a new task to the db

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
	console.log(onGoingTaskId);
	console.log(startTime);
	if (req.params.taskId === onGoingTaskId) {
		res.json({
			taskId: onGoingTaskId,
			startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
		});
	} else {
		res.json();
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
