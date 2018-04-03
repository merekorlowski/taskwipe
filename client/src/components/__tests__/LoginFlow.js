import React from 'react';
import App from '../App';
// import Login from '../Login';
// import Tasks from '../Tasks';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;
configure({adapter: new Adapter()});

describe('Login Flow Tests', () => {
	it('logs into a user account', (done) => {
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
		expect(email.instance().value).toBe('morlo088@uottawa.ca');
		
		password.simulate('focus');
		password.simulate('change', {
			target: {
				name: 'password',
				value: 'password'
			}
		});
		expect(password.instance().value).toBe('password');

		form.simulate('submit');
		// setTimeout(() => {
		// expect(wrapper.find(Tasks)).toHaveLength(1);
		done();
		// });
	});

	// it('Opens the tasks page when logged in.', (done) => {
	// 	localStorage.setItem('loggedIn', true);
	// 	localStorage.setItem('employeeId', '003');
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={[ '/Tasks' ]}>
	// 			<App/>
	// 		</MemoryRouter>
	// 	);
	// 	expect(wrapper.find(Tasks)).toHaveLength(1);
	// 	done();
	// });
});
