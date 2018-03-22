import React, { Component } from 'react';
import './styles.css';
import ProjectService from '../../services/projects';

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
					</div>
				</div>
			</div>
		);
	}
    
	/**
	Gets all the projects for the current user and updates the state
	*/
	getProjects() {
		this.projectService.getProjects('e1').then(res => {
			let projects = res.data;
			this.setState({projects: projects});
		}).catch(err => {
			console.error(err);
		});
	}
}

export default Projects;
