import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { addProject } from '../../actions/projects';

import { PROJECT } from '../../constants';
import './styles.scss';

class AddProjectForm extends Component {
	data = {
		title: '',
		url: '',
		status: PROJECT.IN_PROGRESS,
		comments: ''
	};

	state = {
		data: {...this.data}
	};

	static propTypes = {
		userId: string.isRequired,
		addProject: func.isRequired
	};

	onSubmit = event => {
		event.preventDefault();

		const { data } = this.state;
		const { userId } = this.props;
		this.props.addProject(userId, data);
		this.setState({ data: {...this.data} });
	}

	onChange = event => {
		let { data } = this.state;
		data[event.target.name] = event.target.value;
		this.setState({ data });
	}

	render() {
		let { data } = this.state;
		return (
			<div className="add-project-form">
				<form onSubmit={this.onSubmit}>
					<div className="space-evenly">
						<input
							name="title"
							type="text"
							autoComplete="off"
							className="tw-form-elem col-8"
							autoFocus="on"
							placeholder="Add a project..."
							required="true"
							value={data.title}
							onChange={this.onChange}
						/>
						<button className="tw-btn col-2 right">Create</button>
					</div>
					<div className="col-8">
						<input
							name="url"
							className="tw-form-elem col-6"
							placeholder="http://url-to-project.com"
							value={data.url}
							onChange={this.onChange}
						/>
						<select
							name="teammembers"
							className="tw-form-elem col-5 right"
							value={data.teamMembers}
							onChange={this.onChange}
						>
							<option value="morlo">Merek Orlowski</option>
						</select>
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
