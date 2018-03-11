const express = require('express');
const router = express.Router();

const employeeData = require('./employeeData.json');

/**
 * Verifies the login credentials provided by the user and sends a response to the user
 */
router.post('/login', (req, res, next) => {
	for (let i = 0; i < employeeData.length; i++) {
		if (employeeData.email == req.query.email && 
			employeeData.password == req.query.password) {
				
			res.json({
				"success": "Successfully logged in"
			});
		}
	}

	res.json({
		"failure": "Invalid email or password"
	});
});

module.exports = router;
