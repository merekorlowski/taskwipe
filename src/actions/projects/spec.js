import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actionCreators from './';
import * as types from './types';

jest.mock('axios');

describe('Project Actions', () => {
	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);

	it('GET_PROJECTS: gets a list of projects', (done) => {
		const store = mockStore([]);
		const userId = '001';

		const response = {
			data: [
				{
					userId: '001',
					projectId: '001',
					title: 'Project A',
					status: 'In Progress',
					comments: 'Various comments regarding this project.'
				},
				{
					userId: '001',
					projectId: '002',
					title: 'Project B',
					status: 'In Progress',
					comments: 'Various comments regarding this project.'
				}
			]
		};

		const expectedActions = [
			{
				type: types.GET_PROJECTS,
				payload: response.data
			}
		];

		axios.get.mockResolvedValue(response);

		store
			.dispatch(actionCreators.getProjects(userId))
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				done();
			});
	});

	it('GET_PROJECTS_ERROR: error occurs while getting a list of projects', (done) => {
		const store = mockStore([]);
		const userId = '001';

		const expectedActions = [
			{
				type: types.GET_PROJECTS_ERROR
			}
		];

		axios.get.mockRejectedValue();

		store
			.dispatch(actionCreators.getProjects(userId))
			.catch(() => {
				const actions = store.getActions()
				expect(actions).toEqual(expectedActions)
				done();
			});
	});

	it('ADD_PROJECT: adds a project', (done) => {
		const store = mockStore([]);
		const userId = '001';
		const data = {
			title: 'Project A'
		};

		const response = {
			data:	{
				ownerId: '001',
				projectId: '001',
				title: 'Project A',
				status: 'In Progress',
				comments: ''
			}
		};

		const expectedActions = [
			{
				type: types.ADD_PROJECT,
				payload: response.data
			}
		];

		axios.post.mockResolvedValue(response);

		store
			.dispatch(actionCreators.addProject(userId, data))
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				done();
			});
	});

	it('ADD_PROJECT_ERROR: error occurs while adding a project', (done) => {
		const store = mockStore([]);
		const userId = '001';
		const data = {
			title: 'Project A'
		};

		const expectedActions = [
			{
				type: types.ADD_PROJECT_ERROR
			}
		];

		axios.post.mockRejectedValue();

		store
			.dispatch(actionCreators.addProject(userId, data))
			.catch(() => {
				const actions = store.getActions()
				expect(actions).toEqual(expectedActions)
				done();
			});
	});

	it('UPDATE_PROJECT: updates a project', (done) => {
		const store = mockStore([]);
		const projectId = '001';
		const data = {
			comments: 'Updated text'
		};

		const response = {
			data:	{
				ownerId: '001',
				projectId: '001',
				title: 'Project A',
				status: 'In Progress',
				comments: 'Updated text'
			}
		};

		const expectedActions = [
			{
				type: types.UPDATE_PROJECT,
				payload: response.data
			}
		];

		axios.put.mockResolvedValue(response);

		store
			.dispatch(actionCreators.updateProject(projectId, data))
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				done();
			});
	});

	it('UPDATE_PROJECT_ERROR: error occurs while updating a project', (done) => {
		const store = mockStore([]);
		const projectId = '001';
		const data = {
			comments: 'Updated text'
		};

		const expectedActions = [
			{
				type: types.UPDATE_PROJECT_ERROR
			}
		];

		axios.put.mockRejectedValue();

		store
			.dispatch(actionCreators.updateProject(projectId, data))
			.catch(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				done();
			});
	});

	it('DELETE_PROJECT: deletes a project', (done) => {
		const store = mockStore([]);
		const projectId = '001';

		const response = {
			data:	{
				projectId: '001'
			}
		};

		const expectedActions = [
			{
				type: types.DELETE_PROJECT,
				payload: response.data
			}
		];

		axios.delete.mockResolvedValue(response);

		store
			.dispatch(actionCreators.deleteProject(projectId))
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
				done();
			});
	});

	it('DELETE_PROJECT_ERROR: error occurs while deleting a project', (done) => {
		const store = mockStore([]);
		const projectId = '001';

		const response = {
			data:	{
				projectId: '001'
			}
		};
		const expectedActions = [
			{
				type: types.DELETE_PROJECT_ERROR
			}
		];

		axios.delete.mockRejectedValue();

		store
			.dispatch(actionCreators.deleteProject(projectId))
			.catch(() => {
				const actions = store.getActions()
				expect(actions).toEqual(expectedActions)
				done();
			});
	});
});
