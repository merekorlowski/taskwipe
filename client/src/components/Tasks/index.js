import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../services/tasks';

/** Tasks page component */
class Tasks extends Component {
	/**
	 * A Tasks component instance
	 * @constructor
	 * @param {*} props - The properties passed into this component
	 */
	constructor(props) {
		super(props);
		this.taskService = new TaskService();
		this.state = {
			tasks: []
		};
		this.getTasks();
	}

	/** Gets all the tasks for the current user and updates the state */
	getTasks() {
		this.taskService.getTasks('e1').then(res => {
			let tasks = res.data;
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Adds a task to the user's list of tasks
	 * @param {*} task
	 */
	addTask(task) {
		this.taskService.addTask(task).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.push(res.data);
			this.setState({tasks: tasks});
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

	/** Renders the tasks page */
	render() {
		return (
			<div className="container">
				<h1>Tasks</h1>
				<div className="title-underline background-theme"></div>
				<ul>
					{this.state.tasks.map(task => (
						<li key={task.taskId}>{task.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Tasks;
