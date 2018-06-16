import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actionCreators from './';
import * as types from './types';

jest.mock('axios');

describe('Session Actions', () => {
	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);

	it('LOG_IN_SUCCESSFULY: logs in', (done) => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('userId');
		localStorage.removeItem('firstName');
		localStorage.removeItem('lastName');

		const store = mockStore([]);
		const email = 'test@test.com';
		const password = '600613!#';

		const response = {
			data: {
				user: {
					userId: '001',
					firstName: 'John',
					lastName: 'Doe'
				},
				token: 'g2grefgwrhfdgsgqe'
			}
		};

		const expectedActions = [
			{
				type: types.LOG_IN_SUCCESS,
				payload: response.data
			}
		];

		axios.post.mockResolvedValue(response);

		store
			.dispatch(actionCreators.login(email, password))
			.then(() => {
				const actions = store.getActions();
				const { token, user } = response.data;
				expect(actions).toEqual(expectedActions);
				expect(localStorage.getItem('jwt')).toEqual(token);
				expect(localStorage.getItem('userId')).toEqual(user.userId);
				expect(localStorage.getItem('firstName')).toEqual(user.firstName);
				expect(localStorage.getItem('lastName')).toEqual(user.lastName);
				done();
			});
	});

	it('LOG_IN_FAILURE: error occured while attempting to log in', (done) => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('userId');
		localStorage.removeItem('firstName');
		localStorage.removeItem('lastName');

		const store = mockStore([]);
		const email = 'test@test.com';
		const password = '600613!#';

		const expectedActions = [
			{
				type: types.LOG_IN_FAILURE
			}
		];

		axios.post.mockRejectedValue();

		store
			.dispatch(actionCreators.login(email, password))
			.catch(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				expect(localStorage.getItem('jwt')).toEqual(null);
				expect(localStorage.getItem('userId')).toEqual(null);
				expect(localStorage.getItem('firstName')).toEqual(null);
				expect(localStorage.getItem('lastName')).toEqual(null);
				done();
			});
	});

	it('LOG_OUT_SUCCESSFULY: logs out', (done) => {
		localStorage.setItem('jwt', 'dsfsdfdfds');
		localStorage.setItem('userId', '001');
		localStorage.setItem('firstName', 'John');
		localStorage.setItem('lastName', 'Doe');

		const store = mockStore([]);

		const expectedActions = [
			{
				type: types.LOG_OUT_SUCCESS,
			}
		];

		store
			.dispatch(actionCreators.logout());
		
		expect(localStorage.getItem('jwt')).toEqual(null);
		expect(localStorage.getItem('userId')).toEqual(null);
		expect(localStorage.getItem('firstName')).toEqual(null);
		expect(localStorage.getItem('lastName')).toEqual(null);
		done();
	});
});
