import axios from 'axios';
import { endPoint } from '../config';

class ProjectApi {
	static getProjects(userId) {
		return axios
			.get(`${endPoint}/user/${userId}/projects`)
			.catch(err => {
				throw(err);
			});
	}
	
	static addProject(userId, data) {
		return axios
			.post(`${endPoint}/user/${userId}/project`, data)
			.catch(err => {
				throw(err);
			});
	}
	
	static updateProject(userId, projectId, data) {
		return axios
			.put(`${endPoint}/user/${userId}/project/${projectId}`, data)
			.catch(err => {
				throw(err);
			});
	}

	static deleteProject(userId, projectId) {
		return axios
			.delete(`${endPoint}/user/${userId}/project/${projectId}`)
			.catch(err => {
				throw(err);
			});
	}
}

export default ProjectApi;
