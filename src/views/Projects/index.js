import React, { Component } from 'react';
import './styles.css';
import ProjectService from '../../services/projects';
import ProjectListItem from '../../components/ProjectListItem';

const DEFAULT_STATUS = 'In Progress';

/** Projects page component */
class Projects extends Component {
/**
	 * A Projects component instance
	 * @constructor
	 * @param {*} props - The properties passed into this component
	 */
	constructor(props) {
		super(props);
		this.newProject = {
			title: '',
			status: DEFAULT_STATUS,
			comments: ''
		};
		this.state = {
			projects: [],
			newProject: this.newProject
		};
	}

	componentDidMount() {
		this.projectService = new ProjectService();
		this.getProjects();
	}
    
	render() {
		return (
			<div className="container">
				<h2>Projects</h2>
				<div className="title-underline bg-theme"></div>
				<ul className="list">
					<li>
						<form className="container" onSubmit={this.addProject.bind(this)}>
							<span className="col-sm-11 col-md-5 col-lg-5">
								<input name="title" type="text" autoComplete="off" className="form-elem" autoFocus="on"
									placeholder="Enter new project" required="true" value={this.state.newProject.title}
									onChange={this.handleNewProjectChange.bind(this)}/>
							</span>
							<span className="col-sm-5 col-md-5 col-lg-5">
								
							</span>
							<span className="col-sm-2 col-md-1 col-lg-1">
								<button className="bg-theme-btn">
									Create
								</button>
							</span>
						</form>
					</li>
					{this.state.projects.map((project, index) => (
						<li key={project.projectId}>
							<ProjectListItem data={project}
								handleDelete={this.deleteProject.bind(this, project.projectId, index)} />
						</li>
					))}
				</ul>
			</div>
		);
	}
    
	/**
	Gets all the projects for the current user and updates the state
	*/
	getProjects() {
		this.projectService.getProjects(localStorage.getItem('employeeId')).then(res => {
			let projects = res.data;
			this.setState({projects: projects});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleNewProjectChange(event) {
		let newProject = {...this.state.newProject};
		newProject[event.target.name] = event.target.value;
		// The change is stored in the change data structure
		this.setState({newProject: newProject});
	}

	/**
	 * Adds a project
	 * @param {*} event
	 */
	addProject(event) {
		event.preventDefault();
		this.projectService.addProject(localStorage.getItem('employeeId'), this.state.newProject).then(res => {
			let projects = this.state.projects;
			projects.push(res.data);
			this.setState({
				projects: projects,
				newProject: {...this.newProject}
			});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Updates a project
	 * @param {*} project
	 * @param {number} index
	 */
	updateProject(project, index) {
		this.projectService.updateProject(project).then(res => {
			let projects = this.state.projects;
			project[index] = res.data;
			this.setState({projects: projects});
		}).catch(err => {
			console.error(err.message);
		});
	}

	/**
	 * Deletes a project
	 * @param {string} projectId
	 * @param {number} index
	 */
	deleteProject(projectId, index) {
		this.projectService.deleteProject(projectId).then(res => {
			let projects = this.state.projects;
			projects.splice(index, 1);
			this.setState({projects: projects});
		}).catch(err => {
			console.error(err.message);
		});
	}
}

export default Projects;
