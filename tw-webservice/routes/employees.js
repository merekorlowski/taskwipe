const express = require('express');
const router = express.Router();

const employeeData = require('./dummyData/employee.json');
const empProjectData= require('./dummyData/employeeProject.json');
const empTeamData= require('./dummyData/employeeTeam.json');

/**
 * Employee routes
 */
router.get('/employees', (req, res) => getAllEmployees(req, res));
router.get('/api/employees/project/:projectId', (req, res) => getEmployeesByProductId(req, res));
router.get('/api/employees/team/:teamId', (req, res) => getEmployeesByTeamId(req, res));

/**
 * Returns all employees to the client
 */
function getAllEmployees(req, res) {
	res.json(employeeData);
}

/**
 * Returns employees by projectId, returns to client
 */
function getEmployeesByProductId(req, res) {
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
}

/**
 * Returns all employee by teamId, return to client
 */
function getEmployeesByTeamId(req, res) {
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
}

module.exports = router;
