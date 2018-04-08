import React, { Component } from 'react';
import moment from 'moment';
import Timeslot from './Timeslot';
import './styles.css';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.currentDate = moment();
		this.days = [];
		this.hours = [];
		this.setDays();
		this.setHours();
	}

	getDay(i) {
		let currentDate = moment().startOf('isoWeek');
		currentDate.add({days: i});
		return currentDate;
	}

	setDays() {
		for (let i = 0; i < 7; i++) {
			this.days[i] = this.getDay(i);
		}
	}

	setHours() {
		for (let i = 1; i <= 24; i++) {
			this.hours.push(moment().hour(i).minute(0));
		}
	}

	render() {
		return (
			<div className="container">
				{/* <div className="current-week">
					<input type="week" />
				</div> */}
				<table className="week">
					<thead>
						<tr>
							<th className="day-title">Time</th>
							{this.days.map((day, index) => (
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
								{this.days.map((day, index) => (
									<td className="" key={index}>
										<Timeslot day={day.format('YYYY-MM-DD')} hour={hour.format('HH:mm')}/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Calendar;
