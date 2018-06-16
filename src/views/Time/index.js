import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, string, func } from 'prop-types';
import moment from 'moment';

import { getTimelogs } from '../../actions/tasks';
// import Timeslot from './Timeslot';
import { WEEK_FORMAT } from '../../constants';
import './styles.scss';
import AddTimelogForm from './AddTimelogForm';

class Time extends Component {
	currentDate = moment();
	weekYear = moment().weekYear();
	week = moment().week();
	hours = [];
	days = [];
	
	state = {
		week: `${this.weekYear}-W${this.week}`
	};

	static propTypes = {
		timelogs: array.isRequired,
		userId: string.isRequired,
		getTimelogs: func.isRequired
	};

	componentDidMount() {
		const { userId, getTimelogs } = this.props;
		const { week } = this.state;
		getTimelogs(userId, week);

		this.initializeDays();
		this.initializeHours();
	}

	onChange = event => {
		const { target } = event;
		this.setState({ [target.name]: target.value }, () => {
			getTimelogs(this.props.userId, target.value);
		});
	};

	initializeDays() {
		for (let i = 0; i < 7; i++) {
			this.days[i] = [];
			for (let j = 0; j < 24; j++) {
				this.days[i][j] = null;
			}
		}
	}

	initializeHours() {
		for (let i = 0; i < 24; i++) {
			this.hours.push(
				moment().hour(i + 1).minute(0).format('HH:mm')
			);
		}
	}

	getDay(index) {
		const { week } = this.state;
		const startOfWeek = moment(week, WEEK_FORMAT).startOf('week');
		return startOfWeek.day(index).format('ddd, DD');
	}

	render() {
		const { week } = this.state;
		return (
			<div className="tw-page-width">
				<h1 className="tw-page-title">Time</h1>
				<AddTimelogForm />
				<div className="week">
					<div className="current-week">
						<input
							name="week"
							type="week"
							className="tw-form-elem week-input"
							value={week}
							onChange={this.onChange}
						/>
					</div>
					<table>
						<thead>
							<tr className="days-header">
								<th></th>
								{this.days.map((day, index) => (
									<th key={index} className="font--small">{this.getDay(index)}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{this.hours.map((hour, index) => (
								<tr key={index}>
									<td className="font--xsmall">{hour}</td>
									{this.days.map((day, index) => (
										<td key={index}></td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	timelogs: state.taskReducer.timelogs,
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	getTimelogs
})(Time);
