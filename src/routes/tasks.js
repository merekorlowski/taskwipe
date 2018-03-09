const express = require('express');
const router = express.Router();

const task_data = require('./task_data.json');

router.get('/tasks', (req, res, next) => {
  res.json(task_data);
});

module.exports = router;
