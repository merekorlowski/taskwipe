const express = require('express');
const router = express.Router();

const task_data = require('./login_data.json');

router.get('/login', (req, res, next) => {
  res.json(login_data);
});

module.exports = router;