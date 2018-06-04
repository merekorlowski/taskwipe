import React, { Component } from 'react';
import { string, func, array } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getTaskTimelogs } from '../../actions/tasks';

class Timeslot extends Component {
	state = {
		day: this.props.day,
		hour: this.props.hour
	};

	static propTypes = {
		day: string.isRequired,
		hour: string.isRequired,
		userId: string.isRequired,
		timelogs: array.isRequired,
		getTaskTimelogs: func.isRequired
	};

	render() {
		let { timelogs } = this.props;
		return (
			<div className="timeslot">
				<div className="timeslot-container">
					{taskTimelogs.map((taskTimelog, index) => (
						<div
							key={index}
							className="task-time-block bg-theme"
							style={{
								top: `${taskTimelog.top}%`,
								bottom: `${taskTimelog.bottom}%`
							}}
						>
							<span className="task-timelog-title">
								{taskTimelog.title}
								<button className="edit-task-btn">
									<i className="fas fa-edit" />
								</button>
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	componentWillMount() {
		const { userId } = this.props;
		this.props.getTaskTimelogs(userId);

		for (let timelog of this.props.timelogs) {
			this.setTimeBlock(timelog);
		}
	}

	setTimeBlock(taskTimelog) {
		let taskTimelogs = this.state.taskTimelogs;
		let start = moment(taskTimelog.start, 'YYYY-MM-DD HH:mm:ss');
		let end = moment(taskTimelog.end, 'YYYY-MM-DD HH:mm:ss');
		let startOfTimeslot = moment(`${this.state.day} ${this.state.hour}`);
		let endOfTimeslot = moment(`${this.state.day} ${this.state.hour}`).add(
			1,
			'h'
		);

		let isStartBetween = start.isBetween(startOfTimeslot, endOfTimeslot);
		let isEndBetween = end.isBetween(startOfTimeslot, endOfTimeslot);
		let isBeforeAndAfter =
			start.isBefore(startOfTimeslot) && end.isAfter(endOfTimeslot);

		taskTimelog.top = 0;
		taskTimelog.bottom = 100;

		if (isStartBetween) {
			let diffInSeconds = start.diff(startOfTimeslot, 'seconds');
			taskTimelog.top = diffInSeconds / 3600 * 100;
			taskTimelogs.push(taskTimelog);
			this.setState({ taskTimelogs: taskTimelogs });
		} else {
			taskTimelog.top = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({ taskTimelogs: taskTimelogs });
		}

		if (isEndBetween) {
			let diffInSeconds = endOfTimeslot.diff(end, 'seconds');
			taskTimelog.bottom = diffInSeconds / 3600 * 100;
			taskTimelogs.push(taskTimelog);
			this.setState({ taskTimelogs: taskTimelogs });
		} else {
			taskTimelog.bottom = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({ taskTimelogs: taskTimelogs });
		}

		if (isBeforeAndAfter) {
			taskTimelog.top = 0;
			taskTimelog.bottom = 0;
			taskTimelogs.push(taskTimelog);
			this.setState({ taskTimelogs: taskTimelogs });
		}
	}
}

const mapStateToProps = state => ({
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	getTaskTimelogs
})(Timeslot);
