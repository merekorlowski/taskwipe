const express = require('express');
const router = express.Router();

const employeeData = require('./employee_data.json');

router.get('/employees', (req, res, next) => {
  res.json(employeeData);
});

module.exports = router;
