import React, { Component } from 'react';
import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects';

import { PROJECT } from '../../constants';
import './styles.scss';

class AddProjectForm extends Component {
	newProject = {
		title: '',
		url: '',
		status: PROJECT.IN_PROGRESS,
		comments: ''
	};

	state = {
		newProject: {...this.newProject}
	};

	static propTypes = {
		userId: string.isRequired,
		addProject: func.isRequired
	};

	onSubmit = event => {
		event.preventDefault();

		const { newProject } = this.state;
		const { userId } = this.props;
		this.props.addProject(userId, newProject);
		this.setState({ newProject: {...this.newProject} });
	}

	onChange = event => {
		let { newProject } = this.state;
		newProject[event.target.name] = event.target.value;
		this.setState({ newProject });
	}

	render() {
		let { newProject } = this.state;
		return (
			<div className="add-project-form">
				<form onSubmit={this.onSubmit}>
					<div>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Title</span>
							<input
								name="title"
								type="text"
								autoComplete="off"
								className="tw-form-elem tw-font-size-medium"
								autoFocus="on"
								placeholder="Enter new project"
								required="true"
								value={newProject.title}
								onChange={this.onChange}
							/>
						</label>
						<span className="right">
							<button className="tw-btn tw-font-size-big">Create</button>
						</span>
					</div>
					<div>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Project URL (Optional)</span>
							<input
								name="url"
								className="tw-form-elem tw-font-size-medium"
								placeholder="http://example.com"
								value={newProject.url}
								onChange={this.onChange}
							/>
						</label>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Team Members</span>
							<select
								name="teammembers"
								className="tw-form-elem tw-font-size-medium"
								value={newProject.teamMembers}
								onChange={this.onChange}
							>
								<option value="morlo">Merek Orlowski</option>
							</select>
						</label>
					</div>
				</form>	
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	addProject
})(AddProjectForm);
