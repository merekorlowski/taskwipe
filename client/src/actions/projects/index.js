import ProjectApi from '../../api/projects';
import * as types from './types';

export const getProjects = (userId) => dispatch => {
	ProjectApi
		.getProjects(userId)
		.then(res => {
			dispatch({
				type: types.GET_PROJECTS,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const addProject = (userId, data) => dispatch => {
	ProjectApi
		.addProject(userId, data)
		.then(res => {
			dispatch({
				type: types.ADD_PROJECT,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};
	
export const updateProject = (projectId, data) => dispatch => {
	ProjectApi
		.updateProject(projectId, data)
		.then(res => {
			dispatch({
				type: types.UPDATE_PROJECT,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const deleteProject = (projectId) => dispatch => {
	ProjectApi
		.deleteProject(projectId)
		.then(res => {
			dispatch({
				type: types.DELETE_PROJECT,
				payload: res.data
			})
		})
		.catch(err => {
			throw(err);
		});
};
