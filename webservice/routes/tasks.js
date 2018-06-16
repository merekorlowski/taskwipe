const express = require('express');
const moment = require('moment');

const taskData = require('../dummyData/task.json');
const projectData = require('../dummyData/project.json');
const timelogData = require('../dummyData/timelog.json');

const router = express.Router();

let taskIdIncrement = 1;
let onGoingTaskId = null;
let start = null;

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

router.get('/api/user/:userId/tasks', (req, res) => getDailyTasks(req, res));
router.get('/api/user/:userId/task/ongoing', (req, res) => getOnGoingTimeLog(req, res));
router.post('/api/user/:userId/task', (req, res) => addTask(req, res));
router.put('/api/user/:userId/task/:taskId', (req, res) => updateTask(req, res));
router.delete('/api/user/:userId/task/:taskId', (req, res) => deleteTask(req, res));
router.post('/api/user/:userId/task/:taskId/start', (req, res) => startTask(req, res));
router.post('/api/user/:userId/task/:taskId/stop', (req, res) => stopTask(req, res));
router.put('/api/user/:userId/task/:taskId/archive', (req, res) => archiveTask(req, res));
router.put('/api/user/:userId/task/:taskId/push', (req, res) => pushTask(req, res));
router.get('/api/user/:userId/task/timelogs', (req, res) => getTimelogs(req, res));

function getDailyTasks(req, res) {
	const { date } = req.query;
	const { userId } = req.params;

	const tasks = [];

	for (let i = 0; i < taskData.length; i++) {
		if (date == taskData[i].date && userId == taskData[i].userId) {
			tasks.push(taskData[i]);
		}
	}

	res.json(tasks);
}

function addTask(req, res) {
	const { userId } = req.params;
	const data = req.body;
	data.taskId = taskIdIncrement;
	data.userId = userId;
	taskIdIncrement++;

	taskData.push(data);

	res.json(data);
}

function updateTask(req, res) {
	const { userId, taskId } = req.params;
	const data = req.body;

	for (let i = 0; i < taskData.length; i++) {
		if (taskData[i].taskId == taskId) {
			prevTaskData = taskData[i];
			taskData[i] = {
				...prevTaskData,
				...data
			};
			break;
		}
	}

	res.json({ taskId });
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
	const { userId } = req.params;
	let onGoingTimelog = null;
	for (let i = 0; i < timelogData.length; i++) {
		if (timelogData[i].userId == userId && !timelogData[i].end) {
			onGoingTimelog = timelogData[i];
			break;
		}
	}
	res.json(onGoingTimelog);
}

function startTask(req, res) {
	const { userId, taskId } = req.params;
	let start = moment();

	onGoingTaskId = taskId;

	let newTimelog = {
		userId,
		taskId,
		start: start.format('YYYY-MM-DD HH:mm:ss'),
		end: ''
	};

	timelogData.push(newTimelog);

	res.json(newTimelog);
}

function stopTask(req, res) {
	const { taskId } = req.params;

	onGoingTaskId = null;

	for (let i = 0; i < timelogData.length; i++) {
		if (timelogData[i].taskId == taskId) {
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

function getTimelogs(req, res) {
	const { date } = req.query;
	const { userId } = req.params;
	const timelogs = [];

	for (let i = 0; i < timelogData.length; i++) {
		if (timelogData[i].end) {
			let timelogStart = moment(timelogData[i].start, 'YYYY-MM-DD HH:mm:ss');
			let timelogEnd = moment(timelogData[i].end, 'YYYY-MM-DD HH:mm:ss');

			if (timelogStart.format('YYYY-MM-DD') == date || timelogEnd.format('YYYY-MM-DD') == date) {
				timelogs.push(timelogData[i]);
			}
		}
	}

	res.json(timelogs);
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
