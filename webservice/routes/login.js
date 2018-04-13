const express = require('express');

const router = express.Router();

const employeeData = require('../dummyData/employee.json');

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

/**
 * Verifies the login credentials provided by the user and sends a response to the user
 */
router.post('/api/login', (req, res) => login(req, res));

function login(req, res) {
	let employee = null;
	const { email, password } = req.body;

	for (let i = 0; i < employeeData.length; i++) {
		if (
			employeeData[i].email === email &&
			employeeData[i].password === password
		) {
			employee = employeeData[i];
			break;
		}
	}

	if (employee) {
		res.json(employee);
	} else {
		res.status(401).send({
			error: 'Unauthorized'
		});
	}
}

module.exports = router;
