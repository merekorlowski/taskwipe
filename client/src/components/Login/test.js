import React from 'react';
import {render} from 'react-dom';
import App from '../App';
import Login from './';
import Tasks from '../Tasks';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';
import axios from 'axios';

configure({adapter: new Adapter()});

beforeEach(() => {
	mockLocalStorage();
});

describe('Login Component Tests', () => {
	it('Opens the login page when not logged in.', (done) => {
		localStorage.setItem('loggedIn', 'false');
		const wrapper = mount(
			<MemoryRouter initialEntries={[ '/login' ]}>
				<App/>
			</MemoryRouter>
		);
		expect(wrapper.find(Login)).toHaveLength(1);
		done();
	});

	it('Opens the tasks page when logged in.', (done) => {
		localStorage.setItem('loggedIn', true);
		localStorage.setItem('employeeId', '003');
		const wrapper = mount(
			<MemoryRouter initialEntries={[ '/Tasks' ]}>
				<App/>
			</MemoryRouter>
		);
		expect(wrapper.find(Tasks)).toHaveLength(1);
		done();
	});
});
