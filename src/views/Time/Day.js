import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

import Timeslot from './Timeslot';
import './styles.scss';

class Day extends Component {
	hours = [];

	static propTypes = {
		date: string.isRequired
	};

	componentDidMount() {
		this.setHours();
	}

	setHours() {
		for (let i = 1; i <= 24; i++) {
			this.hours.push(
				moment()
					.hour(i)
					.minute(0)
					.format('HH:mm')
			);
		}
	}

	render() {
		return (
			<div>
				<ul>
					{this.hours.map(hour => (
						<li key={hour}>
							<Timeslot
								date={date}
								hour={hour.format('HH:mm')}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Day;
