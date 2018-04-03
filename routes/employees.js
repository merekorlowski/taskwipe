const express = require('express');
const router = express.Router();

const employeeData = require('./employeeData.json');
const empProjectData= require('./employeeProjectData.json');
const empTeamData= require('./employeeTeamData.json');

/**
 * Returns all employees to the client
 */
router.get('/employees', (req, res) => {
	res.json(employeeData);
});

/**
 * Returns employees by projectId, returns to client
 */
router.get('/api/employees/project/:projectId', (req, res) => {
	let employees=[];
	let projectid= req.params.projectId;
	for(var i=0; i<empProjectData.length; i++){
		if(projectid == empProjectData[i].projectId){
			let employeeid = empProjectData[i].employeeId;
			for(var j=0; j<employeeData;j++){
				if (employeeid == employeeData[j].employeeId){
					employees.push(employeeData[j].firstName+" "+employeeData[j].lastName);
				}
			}
		}
	}
	res.json(employees);
});

/**
 * Returns all employee by teamId, return to client
 */
router.get('/api/employees/team/:teamId', (req, res) => {
	let employees=[];
	let teamid= req.params.teamId;
	for(var i=0; i<empTeamData.length; i++){
		if(teamid == empTeamData[i].teamId){
			let employeeid = empTeamData[i].employeeId;
			for(var j=0; j<employeeData;j++){
				if (employeeid == employeeData[j].employeeId){
					employees.push(employeeData[j].firstName+" "+employeeData[j].lastName);
				}
			}
		}
	}
	res.json(employees);
});

module.exports = router;
