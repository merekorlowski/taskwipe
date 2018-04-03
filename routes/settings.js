const express = require('express');
const router = express.Router();

const settingsData = require('./settingsData.json');

/**
 * Returns the settings for a given user
 */
router.get('/api/settings/:employeeId', (req, res, next) => {

  let employeeId = req.params.employeeId;

  let settings = [];

  for (let i = 0; i < settingsData.length; i++) {
		if (employeeId == settingsData[i].employeeId) {
			settings.push(settingsData[i]);
		}
  }

  // TODO: Get all tasks from the db for a specific user

  res.json(settings);
});

/**
 * Updates a settings for a specific user
 */
router.put('/api/settings/:employeeId', (req, res, next) => {
  let settings = req.body;

  // TODO: Update settings for a user in the db

  res.json(settings);
});

module.exports = router;
