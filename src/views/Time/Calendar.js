import React, { Component } from 'react';
import moment from 'moment';

// import Timeslot from './Timeslot';
import { WEEK_FORMAT } from '../../constants';
import './styles.scss';

class Calendar extends Component {
	currentDate = moment();
	hours = [];
	weekYear = moment().weekYear();
	week = moment().week();
	
	state = {
		week: this.weekYear + '-W' + this.week,
		days: []
	};

	componentDidMount() {
		this.setHours();
		this.setDays();
	}

	onChange = event => {
		if (event.target.name === 'week') {
			let isAfter = moment(event.target.value, WEEK_FORMAT).isAfter(moment());
			if (!isAfter) {
				this.setState({ [event.target.name]: event.target.value }, () => {
					this.setDays();
				});
			} else {
				alert('Can not view time in the future!');
			}
		}
	};

	setHours() {
		for (let i = 1; i <= 24; i++) {
			this.hours.push(
				moment()
					.hour(i)
					.minute(0)
			);
		}
	}

	render() {
		let { week, days } = this.state;
		return (
			<div>
				{/* <div className="current-week">
					<input
						name="week"
						type="week"
						className="form-elem time-week"
						value={week}
						onChange={this.onChange}
					/>
				</div>
				<ul className="week">
					<thead>
						<tr>
							<th className="day-title">Time</th>
							{days.map((day, index) => (
								<th className="day-title" key={index}>
									<span>{day.format('ddd, DD')}</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.hours.map(hour => (
							<tr key={hour}>
								<td className="hour">{hour.format('HH:mm')}</td>
								{days.map((day, index) => (
									<td key={index}>
										<Timeslot
											day={day.format('YYYY-MM-DD')}
											hour={hour.format('HH:mm')}
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table> */}
			</div>
		);
	}
}

export default Calendar;
