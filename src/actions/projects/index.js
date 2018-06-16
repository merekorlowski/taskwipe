import ProjectApi from '../../api/projects';
import * as types from './types';

export const getProjects = (userId) => dispatch => {
	return ProjectApi
		.getProjects(userId)
		.then(res => {
			dispatch({
				type: types.GET_PROJECTS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_PROJECTS_ERROR
			});
			throw(err);
		});
};

export const addProject = (userId, data) => dispatch => {
	return ProjectApi
		.addProject(userId, data)
		.then(res => {
			dispatch({
				type: types.ADD_PROJECT,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.ADD_PROJECT_ERROR
			});
			throw(err);
		});
};
	
export const updateProject = (userId, projectId, data) => dispatch => {
	return ProjectApi
		.updateProject(userId, projectId, data)
		.then(res => {
			dispatch({
				type: types.UPDATE_PROJECT,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.UPDATE_PROJECT_ERROR
			});
			throw(err);
		});
};

export const deleteProject = (projectId) => dispatch => {
	return ProjectApi
		.deleteProject(projectId)
		.then(res => {
			dispatch({
				type: types.DELETE_PROJECT,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: types.DELETE_PROJECT_ERROR
			});
			throw(err);
		});
};
