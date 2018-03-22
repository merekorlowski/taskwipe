const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./taskData.json');

/**
 * Returns all of the tasks for a given user
 */
router.get('/api/tasks', (req, res, next) => {
  let employeeId = req.query.employeeId;

  // TODO: Get all tasks from the db for a specific user

  res.json(taskData);
});

/**
 * Adds a new task to the user's task list
 */
router.post('/api/task', (req, res, next) => {
  let task = req.body;

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

  // TODO: Delete a task in the db

  res.json({taskId: taskId});
});

/**
 * Gets the current time log
 */
router.get('/api/task/:taskId/ongoing-timelog', (req, res, next) => {
	let taskId = req.params.taskId;
	let startTime = new Date('2018-03-19T23:30');

  res.json({
		taskId: taskId,
		startTime: startTime
	});
});

/**
 * Starts a timer for a task
 */
router.post('/api/task/:taskId/start', (req, res, next) => {
	let taskId = req.params.taskId;
	let startTime = moment();

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


  res.json({
		taskId: taskId
	});
});

module.exports = router;
