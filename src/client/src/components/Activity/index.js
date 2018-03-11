import React, { Component } from 'react';
import './styles.css';

import Calendar from './Calendar';

class Activity extends Component {
	render() {
		return (
			<div className="Activity">
				<h1>Activity</h1>
				<div className="title-underline"></div>
				{/*<Calendar/>*/}
			</div>
		);
	}
}

export default Activity;
