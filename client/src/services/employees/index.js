import axios from 'axios';
import httpConfig from '../httpConfig.js';

/** Service for handling http requests for the employee api */

class EmployeeService{
	/**
	 * Represents an EmployeeService.
	 * @constructor
	 */
	constructor() {
		this.endPoint = `${httpConfig.host}:${httpConfig.port}/${httpConfig.basePath}`;
	}

	/**
	 * Return all the employees(users)
	 * @return Returns a promise
	 */
	getAllEmployees() {
		return axios.get(`${this.endPoint}/employees`);
	}
	/**
	 * Return all employees for a given project
	 * @param {string} projectId - The id of a project
	 * @return Returns a promise
	 */
	getEmployeesbyProject(projectId) {
		return axios.get(`${this.endPoint}/employees?projectId=${projectId}`);
	}
	/**
	 * Return all employees for a given team
	 * @param {string} teamId - The id of a team
	 * @return Returns a promise
	 */
	getEmployeesbyTeam(teamId) {
		return axios.get(`${this.endPoint}/employees?teamId=${teamId}`);
	}
}

export default EmployeeService
