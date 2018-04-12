import React from 'react';
import App from '../views/App';
import Tasks from '../views/Tasks';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;
configure({adapter: new Adapter()});

beforeEach(() => {
	mockLocalStorage();
});

describe('Login Flow Tests', () => {
	localStorage.setItem('loggedIn', 'false');
	const wrapper = mount(
		<MemoryRouter initialEntries={[ '/login' ]}>
			<App/>
		</MemoryRouter>
	);
	let form = wrapper.find('form').first();
	let email = wrapper.find('#email').first();
	let password = wrapper.find('#password').first();

	it('should enter email', (done) => {
		email.simulate('focus');
		email.simulate('change', {
			target: {
				name: 'email',
				value: 'morlo088@uottawa.ca'
			}
		});
		expect(email.instance().value).toBe('morlo088@uottawa.ca');
		done();
	});

	
	it('should enter password', (done) => {
		password.simulate('focus');
		password.simulate('change', {
			target: {
				name: 'password',
				value: 'password'
			}
		});
		expect(password.instance().value).toBe('password');
		done();
	});

	form.simulate('submit');

	// it('should submit login successfully', (done) => {
	// 	setTimeout(() => {
	// 		expect(wrapper.find(Tasks)).toHaveLength(1);
	// 		done();
	// 	}, 500);
	// });

	it('should open the Tasks page when logged in.', (done) => {
		localStorage.setItem('loggedIn', true);
		localStorage.setItem('employeeId', '000');
		const wrapper = mount(
			<MemoryRouter initialEntries={[ '/tasks' ]}>
				<App/>
			</MemoryRouter>
		);
		expect(wrapper.find(Tasks)).toHaveLength(1);
		done();
	});
});
