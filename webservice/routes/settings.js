const express = require('express');

const router = express.Router();

const settingsData = require('../dummyData/settings.json');

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

/**
 * Settings routes
 */
router.get('/api/settings/:userId', (req, res) =>
	getUserSettings(req, res)
);
router.put('/api/settings/:userId', (req, res) =>
	updateUserSettings(req, res)
);

/**
 * Returns the settings for a given user
 */
function getUserSettings(req, res) {
	const { userId } = req.params;

	let settings = {};

	for (let i = 0; i < settingsData.length; i++) {
		if (userId == settingsData[i].userId) {
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
		if (settings.userId == settingsData[i].userId) {
			settingsData[i] = { ...settings };
			break;
		}
	}

	res.json(settings);
}

module.exports = router;
