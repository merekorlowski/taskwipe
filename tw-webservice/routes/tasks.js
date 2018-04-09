const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskData = require('./dummyData/task.json');
const projectData = require('./dummyData/project.json');
const timelogData = require('./dummyData/timelog.json');
let taskIdIncrement = 1;
let timelogIdIncrement = 1;
let onGoingTaskId = null;
let startTime = null;

/**
 * Task routes
 */
router.get('/api/tasks', (req, res) => getTasks(req, res));
router.post('/api/task', (req, res) => addTask(req, res));
router.put('/api/task/:taskId', (req, res) => updateTask(req, res));
router.delete('/api/task/:taskId', (req, res) => deleteTask(req, res));
router.get('/api/task/:taskId/ongoing-timelog', (req, res) => getOnGoingTimeLog(req, res));
router.post('/api/task/:taskId/start', (req, res) => startTimer(req, res));
router.post('/api/task/:taskId/stop', (req, res) => stopTimer(req, res));
router.put('/api/task/:taskId/archive', (req, res) => archiveTask(req, res));
router.put('/api/task/:taskId/push', (req, res) => pushTask(req, res));
router.get('/api/task/timelogs', (req, res) => getTaskTimelogs(req, res));

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
	timelogId = timelogIdIncrement;
	timelogIdIncrement++;

	timelogData.push({
		taskId: taskId,
		start: startTime.format('YYYY-MM-DD HH:mm:ss'),
		end: ''
	});

  	res.json({
		taskId: taskId,
		timelogId: timelogId,
		startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
	});
}

function stopTimer(req, res) {
	let taskId = req.params.taskId;

	timelogId = null;
	onGoingTaskId = null;

	for (let timelog of timelogData) {
		if (timelog.timelogId == timelogId) {
			timelog.end = moment().format('YYYY-MM-DD HH:mm:ss');
			break;
		}
	}

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

function getTaskTimelogs(req, res) {
	let day = req.query.day;
	let hour = req.query.hour;
	let timeslot = {
		start: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
		end: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm').add(1, 'h').format('YYYY-MM-DD HH:mm:ss')
	};

	let taskTimelogs = [];

	for (let timelog of timelogData) {
		if (areOverlaping(timeslot, timelog)) {
			for (let task of taskData) {
				if (task.taskId == timelog.taskId) {
					taskTimelogs.push({
						taskId: task.taskId,
						title: task.title,
						start: timelog.start,
						end: timelog.end
					});
				}
			}
		}
	}

	res.json(taskTimelogs);
}

function areOverlaping(timeslot, timelog) {
	if (timelog.start && timelog.end) {
		return (
			((timelog.start >= timeslot.start) && (timelog.start < timeslot.end)) ||
			((timelog.end > timeslot.start) && (timelog.end <= timeslot.end)) ||
			((timelog.start <= timeslot.start) && (timelog.end >= timeslot.end)) 
		);
	} else {
		return false;
	}
}

module.exports = router;
