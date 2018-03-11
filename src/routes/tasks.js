const express = require('express');
const router = express.Router();

const task_data = require('./task_data.json');

/**
 * Returns all of the tasks for a given user
 */
router.get('/api/tasks', (req, res, next) => {
  let employeeId = req.query.employeeId;

  // TODO: Get all tasks from the db for a specific user

  res.json(task_data);
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
router.put('/api/task', (req, res, next) => {
  let task = req.body;

  // TODO: Update task in the db

  res.json(task);
});

/**
 * Deletes a task from the user's task list
 */
router.delete('/api/task', (req, res, next) => {
  let taskId = req.body.taskId;

  // TODO: Delete a task in the db

  res.json({taskId: taskId});
});

module.exports = router;
