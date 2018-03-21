import React, { Component } from 'react';
import './styles.css';
import ProjectService from '../../services/tasks';

/** Projects page component */
class Projects extends Component {
    /**
	 * A Projects component instance
	 * @constructor
	 * @param {*} props - The properties passed into this component
	 */
	constructor(props) {
		super(props);
		this.projectService = new ProjectService();
		this.state = {
			projects: [],
			newProject: {}
		};
		this.getProjects();
	}
    
	render() {
		return (
			<div className="container">
				<h2>Projects</h2>
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
										<select name="project" className="form-elem"
											value={this.state.newTask.project} onChange={this.handleNewTaskChange.bind(this)}>
											<option>Capstone</option>
											<option>P1</option>
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
								<li key={task.taskId}>
									<div className="container">
										<span className="col-xs-2 col-lg-3">{task.title}</span>
										<span>
											<span className="col-xs-1">
												<i className="fa fa-angle-down"></i>
											</span>
											<span className="col-xs-1" >
												<i className="fa fa-comment"></i>
											</span>
											<span className="col-xs-1">
												<i className="fa fa-edit"></i>
											</span>
											<span className="col-xs-1" onClick={this.deleteTask.bind(this, task.taskId, index)}>
												<i className="fa fa-times"></i>
											</span>
										</span>
										<span className="col-xs-2">
											<select className="form-elem" value={task.project} onChange={this.handleTaskChange.bind(this, index)}>
												<option>Capstone</option>
												<option>P1</option>
											</select>
										</span>
										<span className="col-xs-2">
											<select className="form-elem" value={task.type} onChange={this.handleTaskChange.bind(this, index)}>
												<option>Priority</option>
												<option>Push</option>
												<option>Archive</option>
												<option>Optional</option>
											</select>
										</span>
										<span className="col-xs-1">
											<button className="bg-theme-btn">Start</button>
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Projects;
