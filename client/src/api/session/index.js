import axios from 'axios';
import { endPoint } from '../config';

class SessionApi {
	static login(email, password) {
		return axios
			.post(`${endPoint}/login`, {
				email: email,
				password: password
			})
			.catch(err => err);
	}

	static logout() {
		return axios
			.post(`${endPoint}/logout`, {})
			.catch(err => err);
	}
}

export default SessionApi;
