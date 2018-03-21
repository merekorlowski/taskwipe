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
			</div>
		);
	}
}

export default Projects;
