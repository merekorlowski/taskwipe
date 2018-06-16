import SessionApi from '../../api/session';
import * as types from './types';

export const login = (email, password) => dispatch => {
	return SessionApi
		.login(email, password).then(res => {
			const { token, user } = res.data;
			localStorage.setItem('jwt', token);
			localStorage.setItem('userId', user.userId);
			localStorage.setItem('firstName', user.firstName);
			localStorage.setItem('lastName', user.lastName);
			window.location = '/';
			dispatch({
				type: types.LOG_IN_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.LOG_IN_FAILURE
			});
			throw(err);
		});
};

export const logout = () => {
	localStorage.removeItem('jwt');
	localStorage.removeItem('userId');
	localStorage.removeItem('firstName');
	localStorage.removeItem('lastName');
	window.location = '/';
	return {
		type: types.LOG_OUT_SUCCESS
	};
};
