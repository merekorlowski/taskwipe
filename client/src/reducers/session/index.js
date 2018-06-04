import * as types from '../../actions/session/types';

const initialState = {
	isActive: !!localStorage.jwt,
	user: {
		userId: localStorage.userId,
		firstName: localStorage.firstName,
		lastName: localStorage.lastName
	}
};

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOG_IN_SUCCESS:
			window.location = '/';
			return {
				isActive: !!localStorage.jwt,
				user: action.payload
			};
		case types.LOG_OUT_SUCCESS:
			window.location = '/';
			return {
				isActive: !!localStorage.jwt,
				user: {}
			};
		default:
			return state;
	}
};

export default sessionReducer;