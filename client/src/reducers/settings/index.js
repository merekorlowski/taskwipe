import * as types from '../../actions/settings/types';

const initialState = [];

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PROJECTS:
			return {
				...state,
				projects: action.payload
			};

		case types.ADD_PROJECT:
			return {
				...state,
				projects: [
					...state.projects,
					action.payload
				]
			};

		case types.UPDATE_PROJECT:
			return action.payload;

		case types.DELETE_PROJECT:
			return action.payload;
			
		default:
			return state;
	}
};

export default projectReducer;
