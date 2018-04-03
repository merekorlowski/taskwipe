import React from 'react';
import App from './';
import Nav from '../Nav';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';

configure({adapter: new Adapter()});

beforeEach(() => {
	mockLocalStorage();
});

describe('App Component', () => {
	it('renders without crashing', () => {
		const wrapper = mount(
			<App/>
		);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});
});
