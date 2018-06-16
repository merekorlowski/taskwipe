import axios from 'axios';
import { endPoint } from '../config';

class SettingsApi {
	static getSettings(userId) {
		return axios
			.get(`${endPoint}/settings/${userId}`)
			.catch(err => err);
	}

	updateSettings(userId, settings) {
		return axios
			.put(`${endPoint}/settings/${userId}`, settings)
			.catch(err => err);
	}
}

export default SettingsApi;
