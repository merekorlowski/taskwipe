const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

const employeeData = require('../dummyData/employee.json');
const config = require('../config');

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
			employee = {
				firstName: employeeData[i].firstName,
				lastName: employeeData[i].lastName
			};
			break;
		}
	}

	if (employee) {
		res.status(200).json({
			user: employee,
			jwt: jsonwebtoken.sign(employee, config.secret)
		});
	} else {
		res.status(401).send();
	}
}

module.exports = router;
