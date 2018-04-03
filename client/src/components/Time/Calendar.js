
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
		}

		this.hours = [];

		for (let i = 8; i < 20; i++) {
			this.hours.push(moment().hour(i).minute(0));
		}
	}

	getDay(i) {
		let currentDate = moment().startOf('isoWeek');
		currentDate.add({days: 0});
		return currentDate;
	}

	render() {
		return (
			<div className="calendar">
				<div className="current-week">
					<input type="week" value="" />
					<Moment format="YYYY-MM-DD">
						{moment().startOf('isoWeek')}
					</Moment>
					<Moment format="YYYY-MM-DD">
						{moment().add({days: 6})}
					</Moment>
				</div>
				<ul className="hours">
					{this.hours.map(hour => (
						<li key={hour}><Moment format="HH:mm">
							{hour}
						</Moment></li>
					))}
				</ul>
				<ul>
					{this.days.map(day => (
						<li key={day}><Day value={day}/></li>
					))}
				</ul>
			</div>
		);
	}
}

export default Calendar;
