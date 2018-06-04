import * as types from '../../actions/projects/types';

const initialState = [];

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PROJECTS:
			return action.payload;

		case types.ADD_PROJECT:
			return [
				...state,
				action.payload
			];

		case types.UPDATE_PROJECT:
			return action.payload;

		case types.DELETE_PROJECT:
			return action.payload;
			
		default:
			return state;
	}
};

export default projectReducer;
