import React from 'react';
import App from './';
import Nav from '../../components/Nav';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';

configure({adapter: new Adapter()});

describe('App Component', () => {
	it('renders without crashing', () => {
		const wrapper = mount(
			<App/>
		);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});
});
