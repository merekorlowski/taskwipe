import React, { Component } from 'react';
import { string } from 'prop-types';
import moment from 'moment';

import { func, array, object } from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getDailyTasks } from '../../actions/tasks';

import Task from '../../models/task';
import TaskListItem from './TaskListItem';
import AddTaskForm from './AddTaskForm';
import { 
	TASK,
	DATE_FORMAT,
	DAY_OF_MONTH_FORMAT
} from '../../constants';
import './styles.scss';

class DailyTasks extends Component {
	state = {
		displayDate: moment(
			this.props.date,
			DATE_FORMAT
		).format(DAY_OF_MONTH_FORMAT),
		onGoingId: null
	};

	static propTypes = {
		userId: string.isRequired,
		date: string.isRequired,
		tasks: object.isRequired,
		projects: array.isRequired,
		getProjects: func.isRequired,
		getDailyTasks: func.isRequired
	};

	componentWillMount() {
		let { date, userId } = this.props;
		this.props.getDailyTasks(userId, date);
		this.props.getProjects(userId);
	}

	get noTasksForTheDay() {
		const { tasks, date } = this.props;
		return tasks[date] ? tasks[date].length > 0 : false; 
	}

	render() {
		let { displayDate } = this.state;
		let { date, tasks, projects } = this.props;
		let dailyTasks = tasks[date];
		return (
			<div>
				<span className="display-date font--large">{displayDate}</span>
				<AddTaskForm
					date={date}
					projects={projects}
				/>
				<ul className="list">
					{this.noTasksForTheDay &&
						dailyTasks.map((task, index) => (
							<li id={task.taskId} key={task.taskId} className="list-elem">
								<TaskListItem
									data={task}
									date={date}
									projects={projects}
								/>
							</li>
						))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	tasks: state.taskReducer.tasks,
	projects: state.projectReducer,
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	getDailyTasks,
	getProjects
})(DailyTasks);
