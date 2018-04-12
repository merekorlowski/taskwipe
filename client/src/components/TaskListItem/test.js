import React from 'react';
import TaskListItem from './';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jasmine-local-storage';

configure({adapter: new Adapter()});

describe('Renders TaskListItem Component', () => {
	it('renders without crashing', (done) => {
		const wrapper = mount(
			<TaskListItem data={{}}
				handleDelete={() => {}}
				handleArchive={() => {}}
				handlePush={() => {}}
				checkIfCanStart={() => {}}
				setOnGoingTask={() => {}}
				removeOnGoingTask={() => {}} />
		);
		expect(wrapper.find(TaskListItem)).toHaveLength(1);
		done();
	});
});
