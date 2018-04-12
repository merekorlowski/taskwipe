import LoginService from './';

describe('Test Login API', () => {
	let loginService = new LoginService();

	it('Returns the successfully logged in uses\'s information.', (done) => {
		const response = {
			'employeeId': '000',
			'firstName': 'Merek',
			'lastName': 'Orlowski',
			'email': 'morlo088@uottawa.ca',
			'password': 'password'
		};
		
		const email = 'morlo088@uottawa.ca';
		const password = 'password';

		loginService.login(email, password).then(res => {
			for (let key in res.data) {
				expect(res.data[key]).toBe(response[key]);
			}
			done();
		});
	});

	it('Returns unauthenticated error.', (done) => {
		const response = 'Unauthorized';
		
		const email = 'invalid@uottawa.ca';
		const password = 'password';

		loginService.login(email, password).catch(err => {
			expect(err.response.data.error).toBe(response);
			done();
		});
	});
});
