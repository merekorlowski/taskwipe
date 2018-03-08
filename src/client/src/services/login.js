import axios from 'axios';
import httpConfig from './httpConfig.js';

export default class LoginService {
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}`;
	}

	login() {
		return axios.post(`${this.endPoint}/login`);
	}

}