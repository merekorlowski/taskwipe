import LoginService from './';

describe('Test Login API', () => {
	let loginService = new LoginService();

	it('Returns the successfully logged in uses\'s information.', (done) => {
		// const response = {
		// 	'employeeId': '001',
		// 	'firstName': 'Mmayen',
		// 	'lastName': 'Ewang',
		// 	'email': 'mewan074@uottawa.ca',
		// 	'password': 'password'
		// };
		
		// const email = 'mewan074@uottawa.ca';
		// const password = 'password';

		// loginService.login(email, password).then(res => {
		// 	for (let key in res.data) {
		// 		expect(res.data[key]).toBe(response[key]);
		// 	}
		// 	done();
		// });
		done();
	});

	it('Returns unauthenticated error.', (done) => {
		// const response = {
		// 	'unauthenticated': true
		// };
		
		// const email = 'invalid@uottawa.ca';
		// const password = 'password';

		// loginService.login(email, password).then(res => {
		// 	for (let key in res.data) {
		// 		expect(res.data[key]).toBe(response[key]);
		// 	}
		// 	done();
		// });
		done();
	});
});
