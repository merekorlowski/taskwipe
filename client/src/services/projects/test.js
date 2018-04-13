import ProjectService from './';

describe('Projects API', () => {
	let projectService = new ProjectService();

	it('Returns the projects for the given employee.', done => {
		const employeeId = '001';
		const projectIds = ['p001', 'p002'];

		projectService.getProjects(employeeId).then(res => {
			for (let i = 0; i < res.data.length; i++) {
				expect(res.data[i].projectId).toBe(projectIds[i]);
			}
			done();
		});
	});
});
