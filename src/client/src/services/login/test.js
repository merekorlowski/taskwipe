import LoginService from './index';

describe('Test Login API', () => {
  it('Returns the task page when the login button is clicked.', () => {
    let loginService = new loginService();
    let username = loginService.getUsername();
    let password = loginService.getPassword();

    loginService.loginButton(username,password);
    expect(loginService.getCurrentPage() == 'taskPage');
  });
});
