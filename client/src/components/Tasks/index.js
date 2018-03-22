import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../services/tasks';
import TaskListItem from './TaskListItem';

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
		this.newTask = {
			title: '',
			type: '',
			project: {
				projectId: '',
				title: ''
			}
		};
		this.state = {
			tasks: [],
			newTask: {...this.newTask}
		};
		this.getTasks();
	}

	/** Renders the tasks page */
	render() {
		return (
			<div className="container">
				<h2>Tasks</h2>
				<div className="title-underline bg-theme"></div>
				<div>
					<div>
						<h5>Monday, March 13</h5>
						<ul className="list">
							<li>
								<form className="container" onSubmit={this.addTask.bind(this)}>
									<span className="col-xs-6 col-lg-8">
										<input name="title" type="text" className="form-elem" placeholder="Enter new task" required="true"
											value={this.state.newTask.title} onChange={this.handleNewTaskChange.bind(this)}/>
									</span>
									<span className="col-xs-3">
										<select name="projectId" className="form-elem"
											value={this.state.newTask.project} onChange={this.handleNewTaskChange.bind(this)}>
											<option value="p1">Project 1</option>
											<option value="p2">Project 2</option>
										</select>
									</span>
									<span className="col-xs-1">
										<button className="bg-theme-btn">
											Create
										</button>
									</span>
								</form>
							</li>
							{this.state.tasks.map((task, index) => (
								<li key={task.taskId}><TaskListItem data={task} handleDelete={this.deleteTask.bind(this, task.taskId, index)} /></li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleNewTaskChange(event) {
		let newTask = {...this.state.newTask};
		newTask[event.target.name] = event.target.value;
		// The change is stored in the change data structure
		this.setState({
			newTask: newTask
		});
	}

	/** Gets all the tasks for the current user and updates the state */
	getTasks() {
		this.taskService.getTasks('e1').then(res => {
			this.setState({tasks: res.data});
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
		this.taskService.addTask(this.state.newTask).then(res => {
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
			console.log(JSON.stringify(tasks));
			tasks.splice(index, 1);
			console.log(JSON.stringify(tasks));
			this.setState({tasks: tasks});
		}).catch(err => {
			console.error(err);
		});
	}
}

export default Tasks;
