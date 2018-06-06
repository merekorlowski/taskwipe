import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

import Day from './Day';
import './styles.scss';

class Week extends Component {
	days = [];

	static propTypes = {
		week: string.isRequired
	};

	componentWillMount() {
		this.setDays();
	}

	setDays() {
		for (let i = 0; i < 7; i++) {
			this.days[i] = this.getDayOfWeek(i);
		}
	}

	getDayOfWeek(i) {
		let currentDate = moment()
			.week(this.props.week.split('-W')[1])
			.startOf('isoWeek');
		currentDate.weekYear(this.props.week.split('-W')[0]);
		currentDate.add({ days: i });
		return currentDate.format('YYYY-MM-DD');
	}

	render() {
		return (
			<div>
				<ul>
					{this.days.map(day => (
						<li key={hour}>
							<Day
								date={day}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Week;
