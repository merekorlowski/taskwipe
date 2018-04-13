const express = require('express');
const moment = require('moment');

const taskData = require('../dummyData/task.json');
const projectData = require('../dummyData/project.json');
const timelogData = require('../dummyData/timelog.json');

const router = express.Router();

let taskIdIncrement = 1;
let onGoingTaskId = null;
let startTime = null;

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

/**
 * Task routes
 */
router.get('/api/tasks', (req, res) => getTasks(req, res));
router.post('/api/task', (req, res) => addTask(req, res));
router.put('/api/task/:taskId', (req, res) => updateTask(req, res));
router.delete('/api/task/:taskId', (req, res) => deleteTask(req, res));
router.get('/api/task/:taskId/ongoing-timelog', (req, res) =>
	getOnGoingTimeLog(req, res)
);
router.post('/api/task/:taskId/start', (req, res) => startTimer(req, res));
router.post('/api/task/:taskId/stop', (req, res) => stopTimer(req, res));
router.put('/api/task/:taskId/archive', (req, res) => archiveTask(req, res));
router.put('/api/task/:taskId/push', (req, res) => pushTask(req, res));
router.get('/api/task/timelogs', (req, res) => getTaskTimelogs(req, res));

function getTasks(req, res) {
	const { employeeId, date } = req.query;

	const tasks = [];

	for (let i = 0; i < taskData.length; i++) {
		if (date == taskData[i].date && employeeId == taskData[i].employeeId) {
			tasks.push(taskData[i]);
		}
	}

	res.json(tasks);
}

function addTask(req, res) {
	const task = req.body;
	task.taskId = taskIdIncrement;
	taskIdIncrement++;

	taskData.push(task);

	res.json(task);
}

function updateTask(req, res) {
	const { taskId } = req.params;
	const { attribute, value } = req.body;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i][attribute] = value;
			break;
		}
	}

	res.json({
		attribute,
		value
	});
}

function deleteTask(req, res) {
	const { taskId } = req.params;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData.splice(i, 1);
			break;
		}
	}

	res.json({ taskId });
}

function getOnGoingTimeLog(req, res) {
	if (req.params.taskId == onGoingTaskId) {
		res.json({
			taskId: onGoingTaskId,
			startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
		});
	} else {
		res.json({});
	}
}

function startTimer(req, res) {
	const { taskId } = req.params;
	startTime = moment();

	onGoingTaskId = taskId;

	timelogData.push({
		taskId,
		start: startTime.format('YYYY-MM-DD HH:mm:ss'),
		end: ''
	});

	res.json({
		taskId,
		startTime: startTime.format('YYYY-MM-DD HH:mm:ss')
	});
}

function stopTimer(req, res) {
	const { taskId } = req.params;

	onGoingTaskId = null;

	for (let i = 0; i < timelogData.length; i++) {
		if (!timelogData[i].end) {
			timelogData[i].end = moment().format('YYYY-MM-DD HH:mm:ss');
			break;
		}
	}

	res.json({
		taskId
	});
}

function archiveTask(req, res) {
	const { taskId } = req.params;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			for (let j = 0; j < projectData.length; j++) {
				if (taskData[i].projectId == projectData[j].projectId) {
					projectData[j].comments +=
						(projectData[j].comments ? '\n- ' : '- ') + taskData[i].title;
					taskData.splice(i, 1);
					break;
				}
			}
		}
	}

	res.json(taskId);
}

function pushTask(req, res) {
	const { taskId } = req.params;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			taskData[i].date = moment(taskData[i].date, 'YYYY-MM-DD')
				.add(1, 'd')
				.format('YYYY-MM-DD');
		}
	}

	res.json(taskId);
}

function getTaskTimelogs(req, res) {
	const { day, hour } = req.query;
	const timeslot = {
		start: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm').format(
			'YYYY-MM-DD HH:mm:ss'
		),
		end: moment(`${day} ${hour}`, 'YYYY-MM-DD HH:mm')
			.add(1, 'h')
			.format('YYYY-MM-DD HH:mm:ss')
	};

	const taskTimelogs = [];

	for (let i = 0; i < timelogData.length; i++) {
		if (areOverlaping(timeslot, timelogData[i])) {
			for (let j = 0; j < taskData.length; j++) {
				if (taskData[j].taskId == timelogData[i].taskId) {
					taskTimelogs.push({
						taskId: taskData[j].taskId,
						title: taskData[j].title,
						start: timelogData[i].start,
						end: timelogData[i].end
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
			(timelog.start >= timeslot.start && timelog.start < timeslot.end) ||
			(timelog.end > timeslot.start && timelog.end <= timeslot.end) ||
			(timelog.start <= timeslot.start && timelog.end >= timeslot.end)
		);
	}

	return false;
}

module.exports = router;
