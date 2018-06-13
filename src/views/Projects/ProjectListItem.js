import React, { Component } from 'react';
import { object, func } from 'prop-types';

import ProjectService from '../../api/projects';
import './styles.scss';

class ProjectListItem extends Component {
	state = {
		data: this.props.data,
		isExpanded: false
	};
	
	static propTypes = {
		data: object.isRequired
	}
	
	onChange = event => {
		let { data } = this.state;
		data[event.target.name] = event.target.value;
		this.setState({ data });
	};

	handleChange(event) {
		let { data } = this.state;
		data[event.target.name] = event.target.value;
		this.setState({ data });
	}

	toggleExpand = () => {
		let { isExpanded } = this.state;
		this.setState({ isExpanded: !isExpanded });
	};

	get statusClass() {
		let { data } = this.state;
		switch(data.status) {
			case 'In Progress':
				return 'in-progress';
			
			case 'Paused':
				return 'paused';

			case 'Completed':
				return 'completed';

			default:
				return '';
		}
	}

	render() {
		let { data, isExpanded } = this.state;
		return (
			<div>
				<div className="space-evenly">
					<span onClick={this.toggleExpand} className="expand-icon allign--middle">
						<i
							className={`fa ${
								isExpanded ? 'fa-angle-up' : 'fa-angle-down'
							}`}
						/>
					</span>
					<span className="allign--middle col-8">
						{data.url
							? <a href={data.url}>{data.title}</a>
							: <span>{data.title}</span>
						}
					</span>
					<select
						name="status"
						className={`tw-form-elem right col-3 ${this.statusClass}`}
						value={data.status}
						onChange={this.onChange}
					>
						<option value="In Progress" className="in-progress">In Progress</option>
						<option value="Paused" className="paused">Paused</option>
						<option value="Completed" className="completed">Completed</option>
					</select>
				</div>
				{isExpanded && (
					<div className="space--top--two">
						<select
							name="teammembers"
							className="tw-form-elem col-6"
							value={data.teamMembers}
							onChange={this.onChange}
						>
							<option value="morlo">Merek Orlowski</option>
						</select>
						<div>
							<textarea
								name="comments"
								autoFocus="on"
								placeholder="Enter notes for this project here."
								className="tw-form-elem font--xsmall col-9"
								value={data.comments}
								onChange={this.onChange}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default ProjectListItem;
