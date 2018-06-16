import sessionReducer from './';
import * as types from '../../actions/session/types';

describe('Session Reducer', () => {
	const initialState = {
		isActive: !!localStorage.jwt,
		user: {
			userId: localStorage.userId,
			firstName: localStorage.firstName,
			lastName: localStorage.lastName
		}
	};

	it('logs in successfully and returns user info and json web token', done => {
		const token = 'geg423gdsgdeg24wgsdtgs32ewg';
		const payload = {
			token,
			user: {
				userId: '001',
				firstName: 'John',
				lastName: 'Doe'
			}
		};

		localStorage.setItem('jwt', token);

		const action = {
			type: types.LOG_IN_SUCCESS,
			payload
		};

		const result = sessionReducer(initialState, action);
		
		expect(result).toEqual({
			isActive: true,
			user: payload.user
		});
		done();
	});

	it('does not log in due to an error', done => {

		localStorage.setItem('jwt', 'tgtgeertretrter');
		
		const action = {
			type: types.LOG_IN_FAILURE
		};

		const result = sessionReducer(initialState, action);
		
		expect(result).toEqual({
			isActive: false,
			user: {}
		});
		done();
	});

	it('logs out successfully', done => {

		localStorage.removeItem('jwt');

		const action = {
			type: types.LOG_OUT_SUCCESS
		};

		const result = sessionReducer(initialState, action);
		
		expect(result).toEqual({
			isActive: false,
			user: {}
		});
		done();
	});	
});
