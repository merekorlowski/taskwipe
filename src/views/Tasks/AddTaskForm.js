import React, { Component } from 'react';
import { object, array, func, string } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import {
	addTask,
	archiveTask
} from '../../actions/tasks';
import { TASK, DATE_FORMAT } from '../../constants';

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

	get isToday() {
		const { date } = this.props;
		return date === moment().format(DATE_FORMAT);
	}

	render() {
		let { data } = this.state;
		let { projects } = this.props;
		return (
			<div className="border rounded padding--full shadow">
				<span>
					<div className="space-evenly">
						<input
							name="title"
							type="text"
							className="tw-form-elem col-8"
							placeholder="Add a task..."
							autoFocus={this.isToday}
							value={data.title}
							onChange={this.onChange}
						/>
						<select
							name="projectId"
							className="tw-form-elem right bg-color--secondary padding--full bold col-3"
							value={data.projectId}
							onChange={this.onChange}
						>
							<option value="" disabled="true">
								Assign to project
							</option>
							{projects.map((project, index) => (
								<option key={index} value={project.projectId}>
									{project.title}
								</option>
							))}
						</select>
					</div>
					<div className="col-8">
						<select
							name="type"
							className="tw-form-elem col-3"
							value={data.type}
							onChange={this.onChange}
						>
							<option value="Normal">Normal</option>
							<option value="Priority">Priority</option>
							<option value="Optional">Optional</option>
						</select>
						<input
							type="date"
							name="date"
							className="tw-form-elem col-4"
							value={data.date}
							onChange={this.onChange}
						/>
						to
						<input
							type="date"
							name="deadline"
							className="tw-form-elem col-4"
							value={data.deadline}
							onChange={this.onChange}
						/>
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
