import React, { Component } from 'react';
import { object, array, func, string } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import {
	addTask,
	archiveTask
} from '../../actions/tasks';
import { TASK } from '../../constants';

import { Dropdown, TextIcon } from '../../components';
import './styles.scss';

class AddTaskForm extends Component {
	newTask = {
		title: '',
		date: this.props.date,
		deadline: '',
		type: TASK.TYPE.NORMAL,
		projectId: '',
		comments: ''
	};

	state = {
		data: {...this.newTask}
	};

	static propTypes = {
		userId: string.isRequired,
		date: string.isRequired,
		projects: array.isRequired,
		archiveTask: func.isRequired
	};

	onChange = event => {
		let { data } = this.state;
		let { userId } = this.props;
		data[event.target.name] = event.target.value;
		this.setState({ data });

		if (event.target.name === 'projectId') {
			this.props.addTask(userId, data);
			this.setState({ data: {...this.newTask} });
		}
	};

	onArchive = () => {
		const { taskId, date } = this.state.data;
		this.props.archiveTask(taskId);
		this.props.getDailyTasks(date);
	}

	render() {
		let { data } = this.state;
		let { projects } = this.props;
		return (
			<div>
				<span className="properties">
					<div>
						<input
							name="title"
							type="text"
							className="tw-form-elem title tw-font-size-medium"
							placeholder="New Task"
							value={data.title}
							onChange={this.onChange}			
						/>
					</div>
					<div>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Created</span>
							<input
								type="date"
								name="date"
								className="tw-form-elem tw-font-size-medium"
								value={data.date}
								onChange={this.onChange}
							/>
						</label>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Due</span>
							<input
								type="date"
								name="deadline"
								className="tw-form-elem tw-font-size-medium"
								value={data.deadline}
								onChange={this.onChange}
							/>
						</label>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Type</span>
							<select
								name="type"
								className="tw-form-elem tw-font-size-medium"
								value={data.type}
								onChange={this.onChange}
							>
								<option value="Normal">Normal</option>
								<option value="Priority">Priority</option>
								<option value="Optional">Optional</option>
							</select>
						</label>
						<label className="tw-highlight-color">
							<span className="tw-font-size-medium">Project</span>
							<select
								name="projectId"
								className="tw-form-elem tw-font-size-medium"
								value={data.projectId}
								onChange={this.onChange}
							>
								<option value="" disabled="true">
									Select
								</option>
								{projects.map((project, index) => (
									<option key={index} value={project.projectId}>
										{project.title}
									</option>
								))}
							</select>
						</label>
						{/* <Dropdown
							title="Actions"
							items={[
								{
									title: "Delete",
									action: this.onDelete
								},
								{
									title: "Archive",
									action: this.onArchive
								}
							]}	
						/> */}
					</div>
				</span>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.projectReducer,
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	addTask,
	archiveTask
})(AddTaskForm);
