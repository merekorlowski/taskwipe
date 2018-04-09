import axios from 'axios';
import httpConfig from '../httpConfig.js';

class LoginService {
	/**
	 * @constructor
	 */
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}

	/**
	 * Attemps to log in to a user account
	 * @param {string} email - The email of the user
	 * @param {string} password - The password of the user
	 * @return Returns a promise
	 */
	login(email, password) {
		return axios.post(`${this.endPoint}/login`, {
			email: email,
			password: password
		});
	}
}

export default LoginService;
