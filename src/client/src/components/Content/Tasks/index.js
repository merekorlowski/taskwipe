import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../../services/tasks';

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
