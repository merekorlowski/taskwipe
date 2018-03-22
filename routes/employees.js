const express = require('express');
const router = express.Router();

const employeeData = require('./employeeData.json');
const empProjectData= require('./employeeProjectData.json');
const empTeamData= require('./employeeTeamData.json');

/**
 * Returns all employees to the client
 */
router.get('/employees', (req, res) => {
  res.json(employeeData);
});

/**
 * Returns employees by projectId, returns to client
 */
router.get('/employeeproject/:projectid', (req, res) => {
	let projectid= req.query.projectId;
	res.json(empProjectData);
});

/**
 * Returns all employee by teamId, return to client
 */

module.exports = router;
