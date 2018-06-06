import BaseService from '../base';

class UserService extends BaseService {
	getAllUsers() {
		return axiosget(`${endPoint}/users`);
	}

	getUsersByProject(projectId) {
		return axiosget(`${endPoint}/users/project/${projectId}`);
	}

	getUsersByTeam(teamId) {
		return axiosget(`${endPoint}/users/team/${teamId}`);
	}

	getUserTeam(userId) {
		return axiosget(`${endPoint}/users/${userId}/team`);
	}

	createTeam(team) {
		return axiospost(
			`${endPoint}/users/${team.userId}/team`,
			team
		);
	}
}

export default UserService;
