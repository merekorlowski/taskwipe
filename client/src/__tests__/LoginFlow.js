import React from 'react';
import App from '../views/App';
import Login from '../views/Login';
import Tasks from '../views/Tasks';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;
configure({adapter: new Adapter()});

let originalTimeout;

beforeEach((done) => {
	originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
	mockLocalStorage();
	done();
});

afterEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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

	email.simulate('focus');
	email.simulate('change', {
		target: {
			name: 'email',
			value: 'morlo088@uottawa.ca'
		}
	});
	password.simulate('focus');
	password.simulate('change', {
		target: {
			name: 'password',
			value: 'password'
		}
	});
	form.simulate('submit');

	it('should enter email', (done) => {
		expect(email.instance().value).toBe('morlo088@uottawa.ca');
		done();
	});

	
	it('should enter password', (done) => {
		expect(password.instance().value).toBe('password');
		done();
	});

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
