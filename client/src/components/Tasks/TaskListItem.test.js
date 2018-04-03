import React from 'react';
import ReactDOM from 'react-dom';
import TaskListItem from './TaskListItem';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import 'jasmine-local-storage';

configure({adapter: new Adapter()});

beforeEach(() => {
	mockLocalStorage();
});

describe('Renders TaskListItem Component', () => {
	it('renders without crashing', (done) => {
		const wrapper = mount(
			<TaskListItem data={{}}
				handleDelete={() => {}}
				checkIfCanStart={() => {}}
				setOnGoingTask={() => {}}
				removeOnGoingTask={() => {}} />
		);
		expect(wrapper.find(TaskListItem)).toHaveLength(1);
		done();
	});
});
