
import axios from 'axios';
import httpConfig from '../httpConfig.js';

/** Service for handling http requests for the settings api */
class SettingsService {
	/**
	 * Represents a SettingsService.
	 * @constructor
	 */
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}
	
	/**
	 * Return the user settings for a specific user
	 * @param {string} employeeId - The id of the employee
	 * @return Returns a promise
	 */
	getUserSettings(employeeId) {
		return axios.get(`${this.endPoint}/settings/${employeeId}`);
	}

	/**
	 * Set the user settings for a specific user
	 * @param {string} employeeId - The id of the employee
	 * @param {string} userSettings - The user settings to be updated
	 * @return Returns a promise
	 */
	setUserSettings(employeeId, userSettings) {
		return axios.put(`${this.endPoint}/settings/${employeeId}`, userSettings);
	}
}

export default SettingsService;
