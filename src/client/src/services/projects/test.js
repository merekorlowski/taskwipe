import TaskService from './index';

describe('Test for creating a new project ', () => {
  it('Creates new project after create button is clicked.', () => {
    let taskService = new TaskService();

    let projectNames = [];
    projectNames.push(taskService.getProjectNames());

    let teamMembers = [];
    teamMembers.push(taskService.getTeamMembers());

    //Get all projectlist data in JSON format
    let projectLists;
    for (var i=0; i<taskService.getProjectNames().length; i++) {
      for (var j=0; j<taskService.getTeamMembers().length; j++) {
        projectLists = {
          projectNames[i] : {
            'teamMember(s)' : teamMembers[j];
          }
        }
      }
    }

    //Create button gets clicked here, takes in user's input of project name and team member(s)
    taskService.createProject(projectNames,teamMembers);

    //Test all project names and team members assigned in each project
    for (var k=0; k<taskService.getProjects().length; k++) {
      expect(taskService.getProjects[k].projectNames == projectLists.projectNames[k]);
      expect(taskService.getProjects[k].projectNames.teamMembers == projectLists.projectNames[k].teamMembers);
    }
  });
});
