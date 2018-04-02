import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../services/tasks';
import DailyTasks from './DailyTasks';
import moment from 'moment';
import EmployeeDropdown from '../EmployeeDropdown';
import '../EmployeeDropdown/select.less';
/** Tasks page component */
class Tasks extends Component {
	/**
	 * A Tasks component instance
	 * @constructor
	 * @param {*} props - The properties passed into this component
	 */
	constructor(props) {
		super(props);
		this.state = {
			weeks: []
		};
		this.taskService = new TaskService();
		this.getWeeks();
	}

	/** Renders the tasks page */
	render() {
		return (
			<div className="container main-section">
				{/* <h2>Tasks</h2>
				<div className="title-underline bg-theme"></div> */}
				<div><EmployeeDropdown/></div>
				<div>
					<ul>
						{this.state.weeks.map((week, index) => (
							<li key={`week-${index}`} className="task-week">
								<h3 className="week-number">Week {index + 1}</h3>
								<ul>
									{week.map((day, index) => (
										<li key={day.date}>
											<DailyTasks date={day.date} tasks={day.tasks} />
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	getWeeks() {
		// temporary while waiting for settings implementation
		let numOfWeeksBefore = 0;
		let numOfWeeksAfter = 2;

		let startOfCurrentWeek = moment();
		let startDateToDisplay = startOfCurrentWeek.subtract(7 * numOfWeeksBefore, 'd');
		let day = startDateToDisplay;

		let weeks = [];
		for (let i = 0; i < (numOfWeeksBefore + numOfWeeksAfter); i++) {
			weeks[i] = [];
			for (let j = 0; j < 7; j++) {
				this.getTasks(weeks, weeks[i], day);
				day = day.clone().add(1, 'd');
			}
		}
	}

	getTasks(weeks, week, day) {
		this.taskService.getTasks('e1', day.format('YYYY-MM-DD')).then(res => {
			week.push({
				date: day.format('YYYY-MM-DD'),
				tasks: res.data
			});
			this.setState({weeks: weeks});
		}).catch(err => {
			console.error(err);
		});
	}
}

export default Tasks;
