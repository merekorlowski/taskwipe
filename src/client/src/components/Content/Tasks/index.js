import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../../services/tasks/index';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.taskService = new TaskService();
    this.state = {
      tasks: []
    }
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks('e1').then(res => {
      let tasks = res.data;
      this.setState({tasks: tasks});
    });
	}
	
	addTask(task) {
    this.taskService.addTask(task).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.push(res.data);
			this.setState({tasks: tasks});
		}).catch(err => {
			// display error
		});
  }

  updateTask(task, index) {
    this.taskService.updateTask(task).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks[index] = res.data;
			this.setState({tasks: tasks});
		}).catch(err => {
			// display error
		});
	}

	deleteTask(taskId, index) {
    this.taskService.deleteTask(taskId).then(res => {
			// if ther response is ready, update the task in the list
			let tasks = this.state.tasks;
			tasks.splice(index, 1);
			this.setState({tasks: tasks});
		}).catch(err => {
			// display error
		});
	}

  render() {
    return (
      <div className="Tasks">
        <h1>Tasks</h1>
        <div className="title-underline"></div>
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
