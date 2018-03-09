const express = require('express');
const router = express.Router();

const employee_data = require('./employee_data.json');

router.get('/employees', (req, res, next) => {
  res.json(employee_data);
});

module.exports = router;
