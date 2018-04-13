import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import ProjectService from '../../services/projects';
import './styles.css';

class ProjectListItem extends Component {
	/**
	 * A Project
	 * @constructor
	 * @param {JSON} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			isExpanded: false
		};
		this.projectService = new ProjectService();
	}

	/**
	 * Static getter for validating the properties passed into this component
	 */
	static get propTypes() {
		return {
			data: PropTypes.any.isRequired,
			handleDelete: PropTypes.func.isRequired
		};
	}

	/**
	 * Renders the task list item
	 */
	render() {
		let { data, isExpanded } = this.state;
		return (
			<div className={`project-list-item ${isExpanded ? 'expanded' : ''}`}>
				<div>
					<span onClick={this.toggleExpand}>
						<i
							className={`fa ${
								isExpanded ? 'fa-angle-up' : 'fa-angle-down'
							} expand-icon`}
						/>
						<span>{data.title}</span>
					</span>
				</div>
				<div>
					<input
						name="url"
						className="form-elem"
						placeholder="http://example.com"
						value={data.url}
						onChange={this.onChange}
					/>
					<select
						name="teammembers"
						className="form-elem"
						value={data.teamMembers}
						onChange={this.onChange}
					>
						<option value="morlo">Merek Orlowski</option>
					</select>
					<select
						name="status"
						className="form-elem"
						value={data.status}
						onChange={this.onChange}
					>
						<option value="In Progress">In Progress</option>
						<option value="Paused">Paused</option>
						<option value="Completed">Completed</option>
						<option value="Delete">Delete</option>
					</select>
				</div>
				{isExpanded && (
					<div className="list-elem-details">
						<textarea
							name="comments"
							autoFocus="on"
							placeholder="Notes"
							value={data.comments}
							onChange={this.onChange}
						/>
					</div>
				)}
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onChange = event => {
		if (event.target.name === 'status' && event.target.value === 'Delete') {
			this.handleDelete();
		} else {
			let { data } = this.state;
			data[event.target.name] = event.target.value;
			this.setState({ data });
		}
	};

	/**
	 * Calls the parent's function to handle deleting this task
	 */
	handleDelete() {
		this.props.handleDelete();
	}

	/**
	 * Toggles the expand feature of the task
	 */
	toggleExpand = () => {
		let isExpanded = this.state.isExpanded;
		this.setState({ isExpanded: !isExpanded });
	};

	/**
	 * Used for sending the JSON of this task to the server
	 */
	toJSON() {
		return this.state.data;
	}
}

export default ProjectListItem;
