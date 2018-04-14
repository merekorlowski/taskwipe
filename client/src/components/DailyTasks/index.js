import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import TaskService from '../../services/tasks';
import ProjectService from '../../services/projects';
import TaskListItem from '../TaskListItem';
import './styles.scss';

const DEFAULT_TYPE = 'Normal';

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
			newTask: { ...this.newTask },
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
		let { newTask, tasks, displayDate, projects } = this.state;
		return (
			<div>
				<h5 className="display-date">{displayDate}</h5>
				<ul className="list">
					<li>
						{
							<div>
								<form
									className="task-list-item"
									onSubmit={this.onSubmitNewTask}
								>
									<div>
										<input
											name="title"
											autoComplete="off"
											type="text"
											autoFocus={this.isToday ? 'on' : ''}
											className="form-elem task-title"
											placeholder="Enter new task"
											required="true"
											value={newTask.title}
											onChange={this.onNewTaskChange}
										/>
										<button className="btn create-btn">Create</button>
									</div>
									<div>
										<input
											name="date"
											type="date"
											className="form-elem"
											value={newTask.date}
											onChange={this.onNewTaskChange}
										/>
										<input
											name="deadline"
											type="date"
											className="form-elem"
											value={newTask.deadline}
											onChange={this.onNewTaskChange}
										/>
										<select
											name="type"
											className="form-elem"
											value={newTask.type}
											onChange={this.onNewTaskChange}
										>
											<option value="Normal">Normal</option>
											<option value="Priority">Priority</option>
											<option value="Optional">Optional</option>
										</select>
										<select
											name="projectId"
											className="form-elem task-project"
											required="true"
											value={newTask.projectId}
											onChange={this.onNewTaskChange}
										>
											{projects.map((project, index) => (
												<option key={index} value={project.projectId}>
													{project.title}
												</option>
											))}
										</select>
									</div>
								</form>
							</div>
						}
					</li>
					{tasks.length > 0 &&
						tasks.map((task, index) => (
							<li id={task.taskId} key={task.taskId}>
								<TaskListItem
									data={task}
									handleDelete={this.deleteTask.bind(this, task.taskId, index)}
									handleArchive={this.archiveTask.bind(
										this,
										task.taskId,
										index
									)}
									checkIfCanStart={this.canStartTask.bind(this, task.taskId)}
									setOnGoingTask={this.setOnGoingTask.bind(this, task.taskId)}
									removeOnGoingTask={this.removeOnGoingTask.bind(this)}
								/>
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
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onNewTaskChange = event => {
		let { newTask } = this.state;
		newTask[event.target.name] = event.target.value;
		// The change is stored in the change data structure
		this.setState({ newTask });
	};

	onSubmitNewTask = event => {
		event.preventDefault();
		this.addTask();
	};

	get isToday() {
		let today = moment().format('ddd, MMM DD');
		return this.state.displayDate === today;
	}

	getProjects() {
		this.projectService
			.getProjects(localStorage.getItem('employeeId'))
			.then(res => {
				let { newTask } = this.state;
				this.setState({
					projects: res.data,
					newTask
				});
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Adds a task to the user's list of tasks
	 * @param {*} task
	 */
	addTask() {
		this.taskService
			.addTask(this.state.newTask)
			.then(res => {
				// if ther response is ready, update the task in the list
				let { tasks } = this.state;
				tasks.push(res.data);
				this.setState({
					tasks,
					newTask: { ...this.newTask }
				});
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Updates a task from the user's list of tasks
	 * @param {*} task
	 * @param {number} index
	 */
	updateTask(task, index) {
		this.taskService
			.updateTask(task)
			.then(res => {
				// if ther response is ready, update the task in the list
				let { tasks } = this.state;
				tasks[index] = res.data;
				this.setState({ tasks });
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Deletes a task from the user's list of tasks
	 * @param {string} taskId
	 * @param {number} index
	 */
	deleteTask(taskId, index) {
		this.taskService
			.deleteTask(taskId)
			.then(res => {
				// if ther response is ready, update the task in the list
				let { tasks } = this.state;
				tasks.splice(index, 1);
				this.setState({ tasks });
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	/**
	 * Archives a task from the user's list of tasks
	 * @param {string} taskId
	 * @param {number} index
	 */
	archiveTask(taskId, index) {
		this.taskService
			.archiveTask(taskId)
			.then(res => {
				let { tasks } = this.state;
				tasks.splice(index, 1);
				this.setState({ tasks });
			})
			.catch(err => {
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
			this.setState({ onGoingId: taskId });
		}
	}

	removeOnGoingTask() {
		this.setState({ onGoingId: null });
	}
}

export default DailyTasks;
