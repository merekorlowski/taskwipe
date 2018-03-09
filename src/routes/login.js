const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
	res.json({
		"success": "Successfully logged in"
	});
});

module.exports = router;