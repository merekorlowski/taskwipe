const express = require('express');
const router = express.Router();

const settingsData = require('../dummyData/settings.json');

/**
 * Settings routes
 */
router.get('/api/settings/:employeeId', (req, res) => getUserSettings(req, res));
router.put('/api/settings/:employeeId', (req, res) => updateUserSettings(req, res));

/**
 * Returns the settings for a given user
 */
function getUserSettings(req, res) {

  let employeeId = req.params.employeeId;

  let settings = {};

  for (let i = 0; i < settingsData.length; i++) {
		if (employeeId == settingsData[i].employeeId) {
			settings = settingsData[i];
		}
  }

  res.json(settings);
}

/**
 * Updates a settings for a specific user
 */
function updateUserSettings(req, res) {
	let settings = req.body;
	
	for (let i = 0; i < settingsData.length; i++) {
		if (settings.employeeId == settingsData[i].employeeId) {
			settingsData[i] = {...settings};
			break;
		}
	}

  res.json(settings);
}

module.exports = router;
