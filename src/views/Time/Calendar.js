
import React, { Component } from 'react';
import './styles.css';
import Moment from 'react-moment';
import moment from 'moment';
import Day from './Day';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.currentDate = moment();
		this.days = [];

		for (let i = 0; i < 7; i++) {
			this.days[i] = this.getDay(i);
			console.log(this.days[i])
		}

		this.hours = [];

		for (let i = 1; i <= 24; i++) {
			this.hours.push(moment().hour(i).minute(0));
		}
	}

	getDay(i) {
		let currentDate = moment().startOf('isoWeek');
		currentDate.add({days: i});
		return currentDate;
	}

	render() {
		return (
			<div className="container">
				{/* <div className="current-week">
					<input type="week" />
				</div> */}
				<ul className="week">
					<li className="days">
						<ul>
							<li className="day day-title">Time</li>
							{this.days.map((day, index) => (
								<li className="day day-title" key={index}>
									<span>{day.format('ddd, DD')}</span>
								</li>
							))}
						</ul>
					</li>
					{this.hours.map(hour => (
						<li className="hour" key={hour}>
							<ul>
								<li className="day">{hour.format('HH:mm')}</li>
								{this.days.map((day, index) => (
									<li className="day" key={index}>
										<div className="timeslot"></div>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Calendar;
