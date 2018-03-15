const express = require('express');
const router = express.Router();

const employeeData = require('./employeeData.json');

/**
 * Returns all employees to the client
 */
router.get('/employees', (req, res, next) => {
  res.json(employeeData);
});

module.exports = router;
