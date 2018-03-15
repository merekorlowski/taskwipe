import ProjectService from './index';

describe('Test for creating new projects ', () => {
  it('Creates new project after create button is clicked.', () => {
    let projectService = new ProjectService();

    let projectNames = [];
    projectNames.push(projectService.getProjectNames());

    let teamMembers = [];
    teamMembers.push(projectService.getTeamMembers());

    //Get all projectlist data in JSON format
    let projectLists;
    for (var i=0; i<projectService.getProjectNames().length; i++) {
      for (var j=0; j<projectService.getTeamMembers().length; j++) {
        projectLists = {
          [projectNames[i]]: {
            'teamMember(s)': teamMembers[j]
          }
        }
      }
    }

    //Create button gets clicked here, takes in user's input of project name and team member(s)
    projectService.createProject(projectNames,teamMembers);

    //Test all project names and team members assigned in each project
    for (var k=0; k<projectService.getProjects().length; k++) {
      expect(projectService.getProjects[k].projectNames == projectLists.projectNames[k]);
      expect(projectService.getProjects[k].projectNames.teamMembers == projectLists.projectNames[k].teamMembers);
    }
  });
});
