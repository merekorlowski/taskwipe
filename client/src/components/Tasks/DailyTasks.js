import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TaskService from '../../services/tasks';
import ProjectService from '../../services/projects';
import TaskListItem from './TaskListItem';
import moment from 'moment';

const DEFAULT_TYPE = 'Priority';

class DailyTasks extends Component {
	constructor(props) {
		super(props);
		this.newTask = {
			title: '',
			type: DEFAULT_TYPE,
			project: {
				projectId: '',
				title: '',
				comments: ''
			},
			date: this.props.date
		};
		this.state = {
			displayDate: moment(this.props.date, 'YYYY-MM-DD').format('ddd, MMM DD'),
			newTask: this.newTask,
			tasks: this.props.tasks,
			onGoingId: null,
			projects: []
		};
	}

	componentDidMount() {
		this.taskService = new TaskService();
		this.projectService = new ProjectService();
		this.getProjects();
	}

	render() {
		return (
			<div>
				<h5 className="display-date">{this.state.displayDate}</h5>
				<ul className="list">
					<li>
						<form className="container" onSubmit={this.addTask.bind(this)}>
							<span className="col-sm-11 col-md-5 col-lg-5">
								<input name="title" type="text" autoFocus={this.isToday ? 'on' : ''} className="form-elem" 
									placeholder="Enter new task" required="true" value={this.state.newTask.title}
									onChange={this.handleNewTaskChange.bind(this)}/>
							</span>
							<span className="col-sm-5 col-md-3 col-md-lg">
								<select name="projectId" className="form-elem" value={this.state.newTask.projectId}
									onChange={this.handleNewTaskChange.bind(this)}>
									{this.state.projects.map((project, index) => (
										<option key={index} value={project.projectId}>{project.title}</option>
									))}
								</select>
							</span>
							<span className="col-sm-3 col-md-2 col-lg-2">
								<input name="deadline" type="date" className="form-elem" value={this.state.newTask.deadline}
									onChange={this.handleNewTaskChange.bind(this)} />
							</span>
							<span className="col-sm-2 col-md-1 col-lg-1">
								<button className="bg-theme-btn">
									Create
								</button>
							</span>
						</form>
					</li>
					{this.state.tasks.map((task, index) => (
						<li key={task.taskId}>
							<TaskListItem data={task}
								handleDelete={this.deleteTask.bind(this, task.taskId, index)}
								checkIfCanStart={this.canStartTask.bind(this, task.taskId)}
								setOnGoingTask={this.setOnGoingTask.bind(this, task.taskId)}
								removeOnGoingTask={this.removeOnGoingTask.bind(this)} />
						</li>
					))}
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
			this.setState({projects: res.data});
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Adds a task to the user's list of tasks
	 * @param {*} task
	 */
	addTask(event) {
		event.preventDefault();
		this.taskService.addTask(this.state.newTask, localStorage.getItem('employeeId')).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.push(res.data);
			this.setState({
				tasks: tasks,
				newTask: {...this.newTask}
			});
		}).catch(err => {
			console.error(err);
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
			console.error(err);
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
			console.error(err);
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
