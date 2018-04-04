const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./dummyData/task.json');
const projectData = require('./dummyData/project.json');
let taskIdIncrement = 1;
let onGoingTaskId = null;
let startTime = null;

router.get('/api/tasks', (req, res) => getTasks(req, res));
router.post('/api/task', (req, res) => addTask(req, res));
router.put('/api/task/:taskId', (req, res) => updateTask(req, res));
router.delete('/api/task/:taskId', (req, res) => deleteTask(req, res));
router.get('/api/task/:taskId/ongoing-timelog', (req, res) => getOnGoingTimeLog(req, res));
router.post('/api/task/:taskId/start', (req, res) => startTimer(req, res));
router.post('/api/task/:taskId/stop', (req, res, next) => stopTimer(req, res));
router.put('/api/task/:taskId/archive', (req, res) => archiveTask(req, res));
router.put('/api/task/:taskId/push', (req, res) => pushTask(req, res));

function getTasks(req, res) {
	let employeeId = req.query.employeeId;
	let date = req.query.date;

	let tasks = [];

	for (let i = 0; i < taskData.length; i++) {
		if (date == taskData[i].date && employeeId == taskData[i].employeeId) {
			tasks.push(taskData[i]);
		}
	}

	res.json(tasks);
}

function addTask(req, res) {
	let task = req.body;
	task.taskId = taskIdIncrement;
	taskIdIncrement++;

	taskData.push(task);

  res.json(task);
}

function updateTask(req, res) {
	let taskId = req.params.taskId;
	let attribute = req.body.attribute;
	let value = req.body.value;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i][attribute] = value;
			break;
		}
	}

  res.json({
		attribute: attribute,
		value: value
	});
}

function deleteTask(req, res) {
	let taskId = req.params.taskId;
	
	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData.splice(i, 1);
			break;
		}
	}

  res.json({taskId: taskId});
}

function getOnGoingTimeLog(req, res) {
	if (req.params.taskId === onGoingTaskId) {
		res.json({
			taskId: onGoingTaskId,
			startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
		});
	} else {
		res.json({});
	}
}

function startTimer(req, res) {
	let taskId = req.params.taskId;
	startTime = moment();

	onGoingTaskId = taskId;

  res.json({
		taskId: taskId,
		startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
	});
}

function stopTimer(req, res) {
	let taskId = req.params.taskId;

	onGoingTaskId = null;

  res.json({
		taskId: taskId
	});
}

function archiveTask(req, res) {
	let taskId = req.params.taskId;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			for (let j = 0; j < projectData.length; j++) {
				if (taskData[i].projectId == projectData[j].projectId) {
					projectData[j].comments +=  ((projectData[j].comments ? '\n- ' : '- ') +  taskData[i].title);
					taskData.splice(i, 1);
					break;
				}
			}
		}
	}

	res.json(taskId);
}

function pushTask(req, res) {
	let taskId = req.params.taskId;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i].date = moment(taskData[i].date, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD');
		}
	}

	res.json(taskId);
}

module.exports = router;
