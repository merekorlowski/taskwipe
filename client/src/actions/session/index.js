import SessionApi from '../../api/session';
import * as types from './types';

export const login = (email, password) => dispatch => {
	SessionApi
		.login(email, password).then(res => {
			if (res.data) {
				localStorage.setItem('jwt', res.data.token);
				localStorage.setItem('userId', res.data.user.userId);
				localStorage.setItem('firstName', res.data.user.firstName);
				localStorage.setItem('lastName', res.data.user.lastName);

				dispatch({
					type: types.LOG_IN_SUCCESS,
					payload: res.data.user
				});
			} else {
				dispatch({
					type: types.LOG_IN_FAILURE,
					payload: 'Unable to verify account, your email or password may be incorrect'
				});
			}
		})
		.catch(err => {
			dispatch({
				type: types.LOG_IN_FAILURE,
				payload: 'Unable to verify account, your email or password may be incorrect'
			});
			throw(err);
		});
};

export const logout = () => {
	localStorage.removeItem('jwt');
	return {
		type: types.LOG_OUT_SUCCESS
	};
};
