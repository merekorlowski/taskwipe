const express = require('express');
const router = express.Router();

const task_data = require('./task_data.json');

router.get('/api/tasks', (req, res, next) => {
  let employeeId = req.query.employeeId;

  // TODO: Get all tasks from the db for a specific user

  res.json(task_data);
});

router.post('/api/task', (req, res, next) => {
  let task = req.body;

  // TODO: Add a new task to the db

  res.json(task);
});

router.put('/api/task', (req, res, next) => {
  let task = req.body;

  // TODO: Update task in the db

  res.json(task);
});

router.delete('/api/task', (req, res, next) => {
  let taskId = req.body.taskId;

  // TODO: Delete a task in the db

  res.json({taskId: taskId});
});

module.exports = router;
