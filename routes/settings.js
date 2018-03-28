const express = require('express');
const router = express.Router();

const settingsData = require('./settingsData.json');

/**
 * Returns the settings for a given user
 */
router.get('/api/settings', (req, res, next) => {
  let employeeId = req.query.employeeId;

  // TODO: Get all tasks from the db for a specific user

  res.json(settingsData);
});

/**
 * Updates a settings for a specific user
 */
router.put('/api/task/:employeeId', (req, res, next) => {
  let settings = req.body;

  // TODO: Update settings for a user in the db

  res.json(settings);
});

module.exports = router;
