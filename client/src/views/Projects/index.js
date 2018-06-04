import React, { Component } from 'react';
import { string, func, array } from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';

import ProjectListItem from './ProjectListItem';
import AddProjectForm from './AddProjectForm';
import { PROJECT } from '../../constants';
import './styles.scss';

class Projects extends Component {
	static propTypes = {
		userId: string.isRequired,
		projects: array.isRequired,
		getProjects: func.isRequired
	};

	componentWillMount() {
		const { userId } = this.props;
		this.props.getProjects(userId);
	}

	render() {
		let { projects } = this.props;
		return (
			<div>
				<h1 className="tw-page-title">Projects</h1>
				<ul className="list">
					<li>
						<AddProjectForm />
					</li>
					{projects.length > 0 && projects.map((project, index) => (
						<li key={project.projectId}>
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
