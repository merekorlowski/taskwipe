const express = require('express');
const jwt = require('jsonwebtoken');

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
				userId: employeeData[i].userId,
				firstName: employeeData[i].firstName,
				lastName: employeeData[i].lastName
			};
			break;
		}
	}

	if (employee) {
		const token = jwt.sign(employee, config.secret, {
			// expiresIn: 86400 // expires in 24 hours
		});
		res.json({ user: employee, token: token });
	} else {
		res.status(401).send();
	}
}

module.exports = router;
