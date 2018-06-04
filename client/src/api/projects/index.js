import axios from 'axios';
import { endPoint } from '../config';

class ProjectApi {
	static getProjects(userId) {
		return axios
			.get(`${endPoint}/projects?userId=${userId}`)
			.catch(err => err);
	}
	
	static addProject(userId, project) {
		return axios
			.post(`${endPoint}/project`, {
				userId: userId,
				project: project
			})
			.catch(err => err);
	}
	
	static updateProject(projectId, fieldsToUpdate) {
		return axios
			.put(`${endPoint}/project/${projectId}`, fieldsToUpdate)
			.catch(err => err);
		}

	static deleteProject(projectId) {
		return axios
			elete(`${endPoint}/project/${projectId}`)
			.catch(err => err);
	}
}

export default ProjectApi;
