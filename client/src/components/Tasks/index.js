import React, { Component } from 'react';
import './styles.css';
import TaskService from '../../services/tasks';
import DailyTasks from './DailyTasks';
import moment from 'moment';
import EmployeeDropdown from '../EmployeeDropdown';

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
	}

	componentDidMount() {
		this.taskService = new TaskService();
		this.getWeeks();
	}

	/**
	 * Renders the tasks page
	 * */
	render() {
		let { weeks } = this.state;
		return (
			<div className="container">
				<h2>Tasks</h2>
				<div className="title-underline bg-theme"></div>
				<EmployeeDropdown/>
				<ul>
					{weeks.map((week, index) => (
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
		);
	}

	/**
	 * Gets the ammount of weeks to be viewed by the user
	 */
	getWeeks() {
		// temporary while waiting for settings implementation
		let numOfWeeks = 2;
		let day = moment();

		let weeks = [];
		for (let i = 0; i < numOfWeeks; i++) {
			weeks[i] = [];
			
			let start = i === 0 ? moment() : moment().add(i * 7, 'd').startOf('week');
			let endOfWeek = moment().add(i * 7, 'd').endOf('week');
			let numOfDays = endOfWeek.diff(start, 'd') + 1;

			day = start;

			for (let j = 0; j < numOfDays; j++) {
				this.getTasks(weeks, i, j, day);
				day = day.clone().add(1, 'd');
			}
		}
	}

	getTasks(weeks, i, j, day) {
		this.taskService.getTasks(localStorage.getItem('employeeId'), day.format('YYYY-MM-DD')).then(res => {
			weeks[i][j] = {
				date: day.format('YYYY-MM-DD'),
				tasks: res.data
			};
			this.setState({weeks: weeks});
		}).catch(err => {
			console.error(err.message);
		});
	}
}

export default Tasks;
