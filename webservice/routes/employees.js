const express = require('express');
const router = express.Router();

const employeeData = require('../dummyData/employee.json');
const empProjectData = require('../dummyData/employeeProject.json');
const empTeamData = require('../dummyData/employeeTeam.json');
const teamData = require('../dummyData/team.json');

/**
 * Employee routes
 */
router.get('/api/employees', (req, res) => getAllEmployees(req, res));
router.get('/api/employees/project/:projectId', (req, res) => getEmployeesByProductId(req, res));
router.get('/api/employees/team/:teamId', (req, res) => getEmployeesByTeamId(req, res));
router.post('/api/employees/:employeeId/team', (req, res) => createTeam(req, res));

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
	let employees = [];
	let teamId = req.params.teamId;
	for(let i = 0; i < empTeamData.length; i++) {
		if(teamId == empTeamData[i].teamId) {
			let employeeId = empTeamData[i].employeeId;
			for(let j = 0; j < employeeData.length; j++) {
				if (employeeId == employeeData[j].employeeId) {
					employees.push(employeeData[j]);
				}
			}
		}
	}
	res.json(employees);
}

function createTeam(req, res) {
	let team = req.body;
	let prevLength = teamData.length;
	let teamId = prevLength + 1;
	let exists = false;

	team.teamId = `tm${teamId}`;

	for (let i = 0; i < teamData.length; i++) {
		if (teamData[i].teamId == teamId) {
			exists = true;
			break;
		}
	}

	if (!exists) {
		teamData.push({
			teamId: teamId,
			name: team.name,
			color: team.color,
			employeeId: team.employeeId
		});

		let members = team.members;
		for (let member of members) {
			empTeamData.push({
				teamId: teamId,
				employeeId: member.employeeId,
				isAdmin: member.isAdmin
			});
		}
	}

	let length = teamData.length;
	res.json({
		teamId: teamId,
		wasAdded: (prevLength === (length - 1))
	});
}

module.exports = router;
