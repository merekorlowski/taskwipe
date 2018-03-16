
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
	 * Return all projects
	 * @return Returns a promise
	 */
	getProjects() {
		return axios.get(`${this.endPoint}/projects`);
	}

	/**
	 * Add a project
	 * @return Returns a promise
	 */
	addProject(project) {
		return axios.post(`${this.endPoint}/project`, project);
	}

	/**
	 * Update a project
	 * @return Returns a promise
	 */
	updateProject(project) {
		return axios.put(`${this.endPoint}/project`, project);
	}

	/**
	 * Delete a project 
	 * @return Returns a promise
	 */
	deleteProject(projectId) {
		return axios.delete(`${this.endPoint}/project`, {projectId:projectId});
	}
}

export default ProjectService;
