import React, { Component } from 'react';
import './styles.css';

import Calendar from '../../components/Calendar';

class Time extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="page-title">Time</h1>
				<div>
					<Calendar/>
				</div>
			</div>
		);
	}
}

export default Time;
