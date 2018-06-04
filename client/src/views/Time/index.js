import React, { Component } from 'react';

import { Calendar } from '../../components';
import './styles.scss';

class Time extends Component {
	render() {
		return (
			<div>
				<h1 className="tw-page-title">Time</h1>
				<div>
					<Calendar />
				</div>
			</div>
		);
	}
}

export default Time;
