import projectReducer from './';
import * as types from '../../actions/projects/types';

describe('Project Reducer', () => {
	const projects =  [
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
	];

	it('GET_PROJECTS: returns a list of projects', done => {
		const state = [];
		const action = {
			type: types.GET_PROJECTS,
			payload: [...projects]
		};

		const result = projectReducer(state, action);

		expect(result).toEqual(action.payload);
		done();
	});

	it('ADD_PROJECT: returns the list of projects ', done => {
		const state = [...projects];
		const project = {
			userId: '001',
			projectId: '003',
			title: 'Project C',
			status: 'In Progress',
			comments: 'Various comments regarding this project.'
		};
		const action = {
			type: types.ADD_PROJECT,
			payload: {...project}
		};

		const result = projectReducer(state, action);

		expect(result).toEqual([
			...projects,
			project
		]);
		done();
	});

	it('UPDATE_PROJECT: returns the original list of projects with an updated project', done => {
		const state = [...projects];
		const updatedProject = {
			...state[0],
			title: 'changed'
		};

		const action = {
			type: types.UPDATE_PROJECT,
			payload: updatedProject
		};

		const result = projectReducer(state, action);
	
		state[0] = updatedProject;

		expect(result).toEqual(state);
		done();
	});

	it('DELETE_PROJECT: returns the list of projects without the deleted one', done => {
		const state = [...projects];
		const action = {
			type: types.DELETE_PROJECT,
			payload: {...state[0]}
		};

		const result = projectReducer(state, action);
		state.splice(0, 1);

		expect(result).toEqual(state);
		done();
	});

	it('GET_PROJECTS_ERROR: returns the original state', done => {
		const state = [...projects];
		const action = {
			type: types.GET_PROJECTS_ERROR
		}

		const result = projectReducer(state, action);

		expect(result).toEqual(state);
		done();
	});

	it('ADD_PROJECT_ERROR: returns the original state', done => {
		const state = [...projects];
		const action = {
			type: types.ADD_PROJECT_ERROR
		}

		const result = projectReducer(state, action);

		expect(result).toEqual(state);
		done();
	});

	it('UPDATE_PROJECT_ERROR: returns the original state', done => {
		const state = [...projects];
		const action = {
			type: types.UPDATE_PROJECT_ERROR
		}

		const result = projectReducer(state, action);

		expect(result).toEqual(state);
		done();
	});

	it('DELETE_PROJECT_ERROR: returns the original state', done => {
		const state = [...projects];
		const action = {
			type: types.DELETE_PROJECT_ERROR
		}

		const result = projectReducer(state, action);

		expect(result).toEqual(state);
		done();
	});
});
