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

	render() {
		let { data, isExpanded } = this.state;
		return (
			<div className="tw-project">
				<span onClick={this.toggleExpand} className="expand-icon">
					<i
						className={`fa ${
							isExpanded ? 'fa-angle-up' : 'fa-angle-down'
						}`}
					/>
				</span>
				<div className="properties">
					<div className="project-title tw-font-size-medium">
						{data.url
							? <a href={data.url}>{data.title}</a>
							: <span>{data.title}</span>
						}
					</div>
					<label className="tw-highlight-color">
						<span className="tw-font-size-medium">Team Members</span>
						<select
							name="teammembers"
							className="tw-form-elem tw-font-size-medium"
							value={data.teamMembers}
							onChange={this.onChange}
						>
							<option value="morlo">Merek Orlowski</option>
						</select>
					</label>
					<label className="tw-highlight-color">
						<span className="tw-font-size-medium">Status</span>
						<select
							name="status"
							className="tw-form-elem tw-font-size-medium"
							value={data.status}
							onChange={this.onChange}
						>
							<option value="In Progress">In Progress</option>
							<option value="Paused">Paused</option>
							<option value="Completed">Completed</option>
						</select>
					</label>
					{isExpanded && (
						<div className="details">
							<textarea
								name="comments"
								autoFocus="on"
								placeholder="Enter notes for this project here."
								className="tw-form-elem tw-font-size-medium"
								value={data.comments}
								onChange={this.onChange}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default ProjectListItem;
