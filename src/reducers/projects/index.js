import * as types from '../../actions/projects/types';

const initialState = [];

const projectReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_PROJECTS:
			return payload;

		case types.ADD_PROJECT:
			return [
				...state,
				payload
			];

		case types.UPDATE_PROJECT:
			return state.map(project => {
				if (project.projectId !== payload.projectId) {
					return project;
				} else {
					return payload;
				}
			});

		case types.DELETE_PROJECT:
			return state.filter(project => project.projectId !== payload.projectId);

		case types.GET_PROJECTS_ERROR:
			return state;

		case types.ADD_PROJECT_ERROR:
			return state;

		case types.UPDATE_PROJECT_ERROR:
			return state;

		case types.DELETE_PROJECT_ERROR:
			return state;
			
		default:
			return state;
	}
};

export default projectReducer;
