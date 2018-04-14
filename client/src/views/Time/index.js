import React, { Component } from 'react';

import Calendar from '../../components/Calendar';
import './styles.css';

class Time extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="page-title">Time</h1>
				<div>
					<Calendar />
				</div>
			</div>
		);
	}
}

export default Time;
