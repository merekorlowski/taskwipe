const express = require('express');
const router = express.Router();

const projectData = require('./dummyData/project.json');
const employeeProjectData = require('./dummyData/employeeProject.json');

let projectIdIncrement = 1;

/**
 * Returns all of the projects for a given user
 */
router.get('/api/projects', (req, res) => {
	let employeeId = req.query.employeeId;
	let projects = [];

	for (let i = 0; i < employeeProjectData.length; i++) {
		if (employeeProjectData[i].employeeId == employeeId) {
			for (let j = 0; j < projectData.length; j++) {
				if (projectData[j].projectId == employeeProjectData[i].projectId) {
					projects.push(projectData[j]);
				}
			}
		}
	}
	
  res.json(projects);
});

/**
 * Adds a new project to the user's project list
 */
router.post('/api/project', (req, res, next) => {
	let project = req.body.project;
	let employeeId = req.body.employeeId;
	project.projectId = projectIdIncrement;
	projectIdIncrement++;

	projectData.push(project);
	employeeProjectData.push({
		employeeId: employeeId,
		projectId: project.projectId,
		projectAdmin: true
	});

  res.json(project);
});


/**
 * Updates a project in the user's project list
 */
router.put('/api/project/:projectId', (req, res) => {
  let project = req.body;

  // TODO: Update project in the db

  res.json(project);
});

/**
 * Deletes a project from the user's project list
 */
router.delete('/api/project/:projectId', (req, res) => {
  let projectId = req.params.projectId;
	
	for (let i = 0; i < projectData.length; i++) {
		if (projectData[i].projectId == projectId) {
			projectData.splice(i, 1);
			break;
		}
	}

  // TODO: Delete a project in the db

  res.json({projectId: projectId});
});

module.exports = router;
