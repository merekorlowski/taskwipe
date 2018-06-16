import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

class AddTimelogForm extends Component {
	newTimelog = {
		date: '',
		taskId: '',
		start: '',
		end: ''
	};

	state = {
		data: {...this.newTimelog}
	};

	static propTypes = {
		userId: string.isRequired
	};

	onChange = event => {
		const { data } = this.state;
		const { target } = event;
		data[target.name] = target.value;
		this.setState({ data });
	};

	render() {
		let { data } = this.state;
		return (
			<div className="add-time-form">
				<div className="space-evenly">
					<select
						name="taskId"
						className="tw-form-elem col-8"
						value={data.taskId}
						onChange={this.onChange}
					>
						<option value="000">Task A</option>
					</select>
					<button className="tw-btn col-2 right">Log time</button>
				</div>
				<div className="col-8">
					<input
						type="date"
						name="date"
						className="tw-form-elem col-5"
						value={data.date}
						onChange={this.onChange}
					/>
					<input
						type="time"
						name="start"
						className="tw-form-elem col-3"
						value={data.start}
						onChange={this.onChange}
					/>
					to
					<input
						type="time"
						name="start"
						className="tw-form-elem col-3"
						value={data.end}
						onChange={this.onChange}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	tasks: state.taskReducer,
	userId: state.sessionReducer.user.userId
});

export default connect(mapStateToProps, {
	
})(AddTimelogForm);
