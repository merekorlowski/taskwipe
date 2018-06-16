import React, { Component } from 'react';
import { string, func, array } from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';

import ProjectListItem from './ProjectListItem';
import AddProjectForm from './AddProjectForm';
import './styles.scss';

class Projects extends Component {
	static propTypes = {
		userId: string.isRequired,
		projects: array.isRequired,
		getProjects: func.isRequired
	};

	componentDidMount() {
		const { userId } = this.props;
		this.props.getProjects(userId);
	}

	render() {
		let { projects } = this.props;
		return (
			<div className="tw-page-width">
				<h1 className="tw-page-title">Projects</h1>
				<AddProjectForm />
				<ul className="list">
					{projects.length > 0 && projects.map((project) => (
						<li key={project.projectId} className="list-elem">
							<ProjectListItem
								data={project}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.projectReducer,
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	getProjects
})(Projects);
