import TaskService from './index';

describe('Test Login API', () => {
  it('Returns the task page when the login button is clicked.', () => {
    let taskService = new TaskService();
    let username = taskService.getUsername();
    let password = taskService.getPassword();

    taskService.loginButton(username,password);
    expect(taskService.getCurrentPage() == 'taskPage');
  });
});
