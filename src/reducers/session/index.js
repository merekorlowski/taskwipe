import * as types from '../../actions/session/types';

const initialState = {
	isActive: !!localStorage.getItem('jwt'),
	user: {
		userId: localStorage.getItem('userId'),
		firstName: localStorage.getItem('firstName'),
		lastName: localStorage.getItem('lastName')
	}
};

const sessionReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.LOG_IN_SUCCESS:
			return {
				isActive: !!localStorage.getItem('jwt'),
				user: payload.user
			};

		case types.LOG_IN_FAILURE:
			return state;

		case types.LOG_OUT_SUCCESS:
			return {
				isActive: !!localStorage.getItem('jwt'),
				user: {}
			};
		default:
			return state;
	}
};

export default sessionReducer;
