
import React, { Component } from 'react';
import './styles.css';
import moment from 'moment';

class Day extends Component {
	constructor(props) {
		super(props);
		this.hours = [];

		for (let i = 8; i < 20; i++) {
			let currentMoment = moment().hour(i).hour();
			this.hours.push(currentMoment);
		}
	}

	render() {
		return (
			<div className="day">
				<ul>
					{this.hours.map(hour => (
						<li key={hour}>hour</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Day;
