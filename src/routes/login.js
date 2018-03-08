const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
	res.json({
		"success": "Successfully logged in"
	});
});

module.exports = router;