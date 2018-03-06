const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res, next) => {
  res.json([
    {
      taskId: 't1',
      title: 'Task 1',
      priority: 'High',
      projectId: 'p1'
    },
    {
      taskId: 't2',
      title: 'Task 2',
      priority: 'High',
      projectId: 'p1'
    },
    {
      taskId: 't3',
      title: 'Task 3',
      priority: 'High',
      projectId: 'p1'
    }
  ])
});

module.exports = router;
