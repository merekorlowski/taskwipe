
import axios from 'axios';
import httpConfig from '../httpConfig.js';

/** Service for handling http requests for the projects api */
class ProjectService {
	/**
	 * Represents a ProjectService.
	 * @constructor
	 */
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}

	/**
	 * Return all the tasks for a given employee
	 * @param {string} employeeId - The id of an employee
	 * @return Returns a promise
	 */
	getProjects(employeeId) {
		return axios.get(`${this.endPoint}/projects?employeeId=${employeeId}`);
	}

	/**
	 * Add a project
	 * @return Returns a promise
	 */
	addProject(employeeId, project) {
		return axios.post(`${this.endPoint}/project`, {
			employeeId: employeeId,
			project: project
		});
	}

	/**
	 * Update a project
	 * @return Returns a promise
	 */
	updateProject(projectId, fieldsToUpdate) {
		return axios.put(`${this.endPoint}/project/${projectId}`, fieldsToUpdate);
	}

	/**
	 * Delete a project
	 * @return Returns a promise
	 */
	deleteProject(projectId) {
		return axios.delete(`${this.endPoint}/project/${projectId}`);
	}
}

export default ProjectService;
