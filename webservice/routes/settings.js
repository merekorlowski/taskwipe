const express = require('express');

const router = express.Router();

const settingsData = require('../dummyData/settings.json');

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

/**
 * Settings routes
 */
router.get('/api/settings/:employeeId', (req, res) =>
	getUserSettings(req, res)
);
router.put('/api/settings/:employeeId', (req, res) =>
	updateUserSettings(req, res)
);

/**
 * Returns the settings for a given user
 */
function getUserSettings(req, res) {
	const { employeeId } = req.params;

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
	const settings = req.body;

	for (let i = 0; i < settingsData.length; i++) {
		if (settings.employeeId == settingsData[i].employeeId) {
			settingsData[i] = { ...settings };
			break;
		}
	}

	res.json(settings);
}

module.exports = router;
