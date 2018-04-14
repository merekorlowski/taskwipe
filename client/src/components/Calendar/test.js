import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';

import Calendar from './';

configure({ adapter: new Adapter() });

describe('Calendar Component', () => {
	it('renders without crashing', () => {
		const wrapper = mount(<Calendar />);
		expect(wrapper.find('.current-week')).toHaveLength(1);
		expect(wrapper.find('.week')).toHaveLength(1);
		expect(wrapper.find('.day-title')).toHaveLength(8);
		expect(wrapper.find('.hour')).toHaveLength(24);
		expect(wrapper.find('.time-week')).toHaveLength(1);
	});
});
