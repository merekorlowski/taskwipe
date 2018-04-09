import React, { Component } from 'react';
import moment from 'moment';
import Timeslot from '../Timeslot';
import './styles.css';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.currentDate = moment();
		this.hours = [];
		let weekYear = moment().weekYear();
		let week = moment().week();
		this.state = {
			week: weekYear + '-W' + week,
			days: []
		};
		this.setHours();
	}

	componentDidMount() {
		this.setDays();
	}

	render() {
		return (
			<div>
				<div className="current-week">
					<input name="week" type="week" value={this.state.week} onChange={this.handleChange.bind(this)} />
				</div>
				<table className="week">
					<thead>
						<tr>
							<th className="day-title">Time</th>
							{this.state.days.map((day, index) => (
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
								{this.state.days.map((day, index) => (
									<td key={index}>
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

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	getDay(i) {
		let currentDate = moment().week(parseInt(this.state.week.split('-W')[1]));
		currentDate.weekYear(parseInt(this.state.week.split('-W')[0]));
		currentDate.add({days: i});
		return currentDate;
	}

	setDays() {
		let days = [];
		for (let i = 0; i < 7; i++) {
			days[i] = this.getDay(i);
		}
		this.setState({days: days});
	}

	setHours() {
		for (let i = 1; i <= 24; i++) {
			this.hours.push(moment().hour(i).minute(0));
		}
	}

}

export default Calendar;
