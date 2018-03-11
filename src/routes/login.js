const express = require('express');
const router = express.Router();

const employeeData = require('./employee_data.json');

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
