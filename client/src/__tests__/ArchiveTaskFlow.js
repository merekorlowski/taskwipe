import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;
configure({ adapter: new Adapter() });

describe('Simulates archiving a task', () => {
	it('archives a task without crashing', done => {
		done();
	});
});