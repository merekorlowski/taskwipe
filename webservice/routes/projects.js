const express = require('express');
const router = express.Router();

const projectData = require('../dummyData/project.json');
const employeeProjectData = require('../dummyData/employeeProject.json');

let projectIdIncrement = 1;

/**
 * Project routes
 */
router.get('/api/projects', (req, res) => getAllUserProjects(req, res));
router.post('/api/project', (req, res) => addProject(req, res));
router.put('/api/project/:projectId', (req, res) => updateProject(req, res));
router.delete('/api/project/:projectId', (req, res) => deleteProject(req, res));

/**
 * Returns all of the projects for a given user
 */
function getAllUserProjects(req, res) {
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
	
	// res.json(projectData)
}

/**
 * Adds a new project to the user's project list
 */
function addProject(req, res) {
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
}

/**
 * Updates a project in the user's project list
 */
function updateProject(req, res) {
	let projectId = req.params.projectId;
  let fieldsToUpdate = req.body;

	for (let project of projectData) {
		if (projectId == project.projectId) {
			for (let field in fieldsToUpdate) {
				project[field] = fieldsToUpdate[field];
			}
		}
	}

  res.json(projectId);
}

/**
 * Deletes a project from the user's project list
 */
function deleteProject(req, res) {
  let projectId = req.params.projectId;
	
	for (let i = 0; i < projectData.length; i++) {
		if (projectData[i].projectId == projectId) {
			projectData.splice(i, 1);
			break;
		}
	}

  res.json({projectId: projectId});
}

module.exports = router;
