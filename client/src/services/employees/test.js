import EmployeeService from './';

describe('Employees API', () => {
	let employeeService = new EmployeeService();

	it('returns all employees', (done) => {
		employeeService.getAllEmployees().then(res => {
			expect(res.data.length).toBe(31);
			done();
		});
	});

	it('creates a team for the user 000', (done) => {
		let team = {
			employeeId: '001',
			name: 'Team A',
			color: '#0000ff',
			members: [
				{ employeeId: '020', isAdmin: false },
				{ employeeId: '021', isAdmin: false },
				{ employeeId: '022', isAdmin: true }
			]
		};

		employeeService.createTeam(team).then(res => {
			let teamId = res.data.teamId;
			team.teamId = teamId;

			expect(res.data.wasAdded).toBe(true);
			done();
		});
	});

	it('returns all of the employees in the team tm1', (done) => {
		let teamId = 'tm1';
		let response = [
			{"employeeId":"002","firstName":"Britt","lastName":"Castelijn","email":"bcastelijn1@epa.gov","password":"2Sex0QyNjH"},
			{"employeeId":"003","firstName":"Raffarty","lastName":"Heal","email":"rheal2@wsj.com","password":"sGGGDxQb"},
			{"employeeId":"004","firstName":"Neal","lastName":"Iacovini","email":"niacovini3@ebay.co.uk","password":"5jS9bW"}
		];

		employeeService.getEmployeesbyTeam(teamId).then(res => {
			expect(res.data.length).toBe(response.length);
			for (let i = 0; i < response.length; i++) {
				for (let attribute in response[i]) {
					expect(response[i][attribute]).toBe(res.data[i][attribute]);
				}
			}
			done();
		});
	});
});
