const express = require('express');
const projectData = require('../dummyData/project.json');
const employeeProjectData = require('../dummyData/employeeProject.json');

const router = express.Router();

let projectIdIncrement = 1;

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */

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
	const { userId } = req.query;
	const projects = [];

	for (let i = 0; i < employeeProjectData.length; i++) {
		if (employeeProjectData[i].userId == userId) {
			for (let j = 0; j < projectData.length; j++) {
				if (projectData[j].projectId == employeeProjectData[i].projectId) {
					projects.push(projectData[j]);
				}
			}
		}
	}

	res.json(projects);
}

/**
 * Adds a new project to the user's project list
 */
function addProject(req, res) {
	const { project, userId } = req.body;
	project.projectId = projectIdIncrement;
	projectIdIncrement++;

	projectData.push(project);
	employeeProjectData.push({
		userId,
		projectId: project.projectId,
		projectAdmin: true
	});

	res.json(project);
}

/**
 * Updates a project in the user's project list
 */
function updateProject(req, res) {
	const { projectId } = req.params;
	const fieldsToUpdate = req.body;

	for (let i = 0; i < projectData.length; i++) {
		if (projectId == projectData[i].projectId) {
			for (const field in fieldsToUpdate) {
				if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
					projectData[i][field] = fieldsToUpdate[field];
				}
			}
		}
	}

	res.json(projectId);
}

/**
 * Deletes a project from the user's project list
 */
function deleteProject(req, res) {
	const { projectId } = req.params;

	for (let i = 0; i < projectData.length; i++) {
		if (projectData[i].projectId == projectId) {
			projectData(i, 1);
			break;
		}
	}

	res.json({ projectId });
}

module.exports = router;
