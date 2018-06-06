import axios from 'axios';
import { endPoint } from '../config';

class UserApi {
	getAllUsers() {
		return axios
			.get(`${endPoint}/users`)
			.catch(err => err);
	}

	getUsersByProject(projectId) {
		return axios
			.get(`${endPoint}/users/project/${projectId}`)
			.catch(err => err);
	}

	getUsersByTeam(teamId) {
		return axios
			.get(`${endPoint}/users/team/${teamId}`)
			.catch(err => err);
	}

	getUserTeam(userId) {
		return axios
			.get(`${endPoint}/users/${userId}/team`)
			.catch(err => err);
	}

	createTeam(team) {
		return axios
			.post(`${endPoint}/users/${team.userId}/team`, team)
			.catch(err => err);
	}
}

export default UserApi;
