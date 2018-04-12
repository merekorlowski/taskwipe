import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import TaskService from '../../services/tasks';
import './styles.scss';

class Timeslot extends Component {
	constructor(props) {
		super(props);
		this.taskService = new TaskService();
		this.state = {
			taskTimelogs: [],
			day: this.props.day,
			hour: this.props.hour
		};
	}

	render() {
		return (
			<div className="timeslot">
				<div className="timeslot-container">
					{this.state.taskTimelogs.map((taskTimelog, index) => (
						<div key={index} className="task-time-block bg-theme" style={{
							top: `${taskTimelog.top}%`,
							bottom: `${taskTimelog.bottom}%`
						}}>
							<span className="task-timelog-title">
								{taskTimelog.title}
								<button className="edit-task-btn"><i className="fas fa-edit"></i></button>
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	componentWillReceiveProps(props) {
		this.setState({
			taskTimelogs: [],
			day: props.day,
			hour: props.hour
		}, () => {
			this.getTaskTimelogs();
		});
	}

	componentDidMount() {
		this.getTaskTimelogs();
	}

	static get propTypes() {
		return {
			day: PropTypes.string.isRequired,
			hour: PropTypes.string.isRequired
		};
	}

	setTimeBlock(taskTimelog) {
		let taskTimelogs = this.state.taskTimelogs;
		let start = moment(taskTimelog.start, 'YYYY-MM-DD HH:mm:ss');
		let end = moment(taskTimelog.end, 'YYYY-MM-DD HH:mm:ss');
		let startOfTimeslot = moment(`${this.state.day} ${this.state.hour}`);
		let endOfTimeslot = moment(`${this.state.day} ${this.state.hour}`).add(1, 'h');

		let isStartBetween = start.isBetween(startOfTimeslot, endOfTimeslot);
		let isEndBetween = end.isBetween(startOfTimeslot, endOfTimeslot);
		let isBeforeAndAfter = start.isBefore(startOfTimeslot) && end.isAfter(endOfTimeslot);

		taskTimelog.top = 0;
		taskTimelog.bottom = 100;

		if (isStartBetween) {
			let diffInSeconds = start.diff(startOfTimeslot, 'seconds');
			taskTimelog.top = (diffInSeconds / 3600) * 100;
			taskTimelogs.push(taskTimelog);
			this.setState({taskTimelogs: taskTimelogs});
		} else {
			taskTimelog.top = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({taskTimelogs: taskTimelogs});
		}

		if (isEndBetween) {
			let diffInSeconds = endOfTimeslot.diff(end, 'seconds');
			taskTimelog.bottom = (diffInSeconds / 3600) * 100;
			taskTimelogs.push(taskTimelog);
			this.setState({taskTimelogs: taskTimelogs});
		} else {
			taskTimelog.bottom = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({taskTimelogs: taskTimelogs});
		}

		if (isBeforeAndAfter) {
			taskTimelog.top = 0;
			taskTimelog.bottom = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({taskTimelogs: taskTimelogs});
		}
	}

	getTaskTimelogs() {
		this.taskService.getTaskTimelogs(this.state.day, this.state.hour).then(res => {
			if (res.data.length > 0) {
				for (let i = 0; i < res.data.length; i++) {
					this.setTimeBlock(res.data[i]);
				}
			}
		}).catch(err => {
			console.error(err.message);
		});
	}
}

export default Timeslot;
