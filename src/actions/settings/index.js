import SettingsApi from '../../api/settings';
import * as types from './types';

export const getSettings = (userId) => dispatch => {
	SettingsApi
		.getSettings(userId)
		.then(res => {
			dispatch({
				type: types.GET_SETTINGS,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};

export const updateSettings = (userId, settings) => dispatch => {
	SettingsApi
		.updateSettings(userId, settings)
		.then(res => {
			dispatch({
				type: types.UPDATE_SETTINGS,
				payload: res.data
			});
		})
		.catch(err => {
			throw(err);
		});
};
