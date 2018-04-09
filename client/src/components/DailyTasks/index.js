import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TaskService from '../../services/tasks';
import ProjectService from '../../services/projects';
import TaskListItem from '../TaskListItem';
import moment from 'moment';

const DEFAULT_TYPE = 'Priority';

class DailyTasks extends Component {
	constructor(props) {
		super(props);
		this.newTask = {
			title: '',
			type: DEFAULT_TYPE,
			employeeId: localStorage.getItem('employeeId'),
			projectId: '',
			comments: '',
			date: this.props.date
		};
		this.state = {
			displayDate: moment(this.props.date, 'YYYY-MM-DD').format('ddd, MMM DD'),
			newTask: this.newTask,
			tasks: this.props.tasks,
			onGoingId: null,
			projects: []
		};
		this.taskService = new TaskService();
		this.projectService = new ProjectService();
	}

	componentDidMount() {
		this.getProjects();
	}

	render() {
		return (
			<div>
				<h5 className="display-date">{this.state.displayDate}</h5>
				<ul className="list">
					<li className="create-task">
						<form className="task-list-item" onSubmit={this.addTask.bind(this)}>
							<div className="list-item-row">
								<input name="title" autoComplete="off" type="text" autoFocus={this.isToday ? 'on' : ''} className="form-elem task-title"
									placeholder="Enter new task" required="true" value={this.state.newTask.title}
									onChange={this.handleNewTaskChange.bind(this)}/>
							</div>
							<div className="list-item-row">
								<span className="left edit-task">
									<select name="projectId" className="form-elem task-project" value={this.state.newTask.projectId}
										onChange={this.handleNewTaskChange.bind(this)}>
										{this.state.projects.map((project, index) => (
											<option key={index} value={project.projectId}>{project.title}</option>
										))}
									</select>
									<input name="deadline" type="date" className="form-elem task-deadline" value={this.state.newTask.deadline}
										onChange={this.handleNewTaskChange.bind(this)} />
								</span>
								<span className="task-create-button right">
									<button className="bg-theme-btn">
										Create
									</button>
								</span>
							</div>
						</form>
					</li>
					{this.state.tasks.length > 0
						? this.state.tasks.map((task, index) => (
							<li id={task.taskId} key={task.taskId}>
								<TaskListItem data={task}
									handleDelete={this.deleteTask.bind(this, task.taskId, index)}
									handleArchive={this.archiveTask.bind(this, task.taskId, index)}
									handlePush={this.pushTask.bind(this, task.taskId, index)}
									checkIfCanStart={this.canStartTask.bind(this, task.taskId)}
									setOnGoingTask={this.setOnGoingTask.bind(this, task.taskId)}
									removeOnGoingTask={this.removeOnGoingTask.bind(this)} />
							</li>
						))
						: (
							<li className="empty-list">
								There are no tasks specified for this day.
							</li>
						)
					}
				</ul>
			</div>
		);
	}

	static get propTypes() {
		return {
			date: PropTypes.string.isRequired,
			tasks: PropTypes.array.isRequired
		};
	};

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleNewTaskChange(event) {
		let newTask = {...this.state.newTask};
		newTask[event.target.name] = event.target.value;
		// The change is stored in the change data structure
		this.setState({newTask: newTask});
	}

	get isToday() {
		let today = moment().format('ddd, MMM DD');
		return this.state.displayDate === today;
	}

	getProjects() {
		this.projectService.getProjects(localStorage.getItem('employeeId')).then(res => {
			let newTask = {...this.state.newTask};
			newTask.projectId = res.data[0].projectId;
			this.setState({
				projects: res.data,
				newTask: newTask
			});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Adds a task to the user's list of tasks
	 * @param {*} task
	 */
	addTask(event) {
		event.preventDefault();
		this.taskService.addTask(this.state.newTask).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.push(res.data);
			this.setState({
				tasks: tasks,
				newTask: {...this.newTask}
			});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Updates a task from the user's list of tasks
	 * @param {*} task
	 * @param {number} index
	 */
	updateTask(task, index) {
		this.taskService.updateTask(task).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks[index] = res.data;
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Deletes a task from the user's list of tasks
	 * @param {string} taskId
	 * @param {number} index
	 */
	deleteTask(taskId, index) {
		this.taskService.deleteTask(taskId).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.splice(index, 1);
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Archives a task from the user's list of tasks
	 * @param {string} taskId
	 * @param {number} index
	 */
	archiveTask(taskId, index) {
		this.taskService.archiveTask(taskId).then(res => {
			let tasks = this.state.tasks;
			tasks.splice(index, 1);
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Pushes a task to the next day
	 * @param {string} taskId
	 * @param {number} index
	 */
	pushTask(taskId, index) {
		this.taskService.pushTask(taskId).then(res => {
			let tasks = this.state.tasks;
			tasks.splice(index, 1);
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err.message);
		});
	}

	canStartTask() {
		if (!this.state.onGoingId && this.isToday) {
			return true;
		} else {
			return false;
		}
	}

	setOnGoingTask(taskId) {
		if (this.canStartTask()) {
			this.setState({onGoingId: taskId});
		}
	}

	removeOnGoingTask() {
		this.setState({onGoingId: null});
	}
}

export default DailyTasks;
