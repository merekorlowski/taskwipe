import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ProjectService from '../../services/projects';

class ProjectListItem extends Component {
	/**
	 * A Project
	 * @constructor
	 * @param {JSON} props
	 */
	constructor(props) {
		super(props);
		let project = this.props.data;
		this.state = {
			projectId: project.projectId,
			title: project.title,
			status: project.status,
			comments: project.comments,
			isExpanded: false
		};
	}

	/**
	 * Static getter for validating the properties passed into this component
	 */
	static get propTypes() {
		return {
			data: PropTypes.any.isRequired,
			handleDelete: PropTypes.func.isRequired
		};
	};

	componentDidMount() {
		this.projectService = new ProjectService();
	}

	/**
	 * Renders the task list item
	 */
	render() {
		return (
			<div className="container">
				<span className="col-md-5 col-lg-5 col-sm-12" onClick={this.toggleExpand.bind(this)}>
					<i className={`fa ${this.state.isExpanded ? 'fa-angle-up' : 'fa-angle-down'} expand-icon`}></i>
					<strong>{this.state.title}</strong>
				</span>
				<span className="col-md-3 col-lg-3 col-sm-3">
					<select name="teammembers" className="form-elem" value={this.state.teamMembers} onChange={this.handleChange.bind(this)}>
						<option value="morlo">Merek Orlowski</option>
					</select>
				</span>
				<span className="col-md-3 col-lg-3 col-sm-3">
					<select name="status" className="form-elem" value={this.state.status} onChange={this.handleChange.bind(this)}>
						<option value="In Progress">In Progress</option>
						<option value="Paused">Paused</option>
						<option value="Completed">Completed</option>
						<option value="Delete">Delete</option>
					</select>
				</span>
				{this.state.isExpanded
					? (
						<div className="col-xs-11 list-elem-details">
							<textarea name="comments" rows="50" autoFocus="on" placeholder="Notes"
								value={this.state.comments} onChange={this.handleChange.bind(this)}></textarea>
						</div>
					) : ''
				}
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleChange(event) {
		if (event.target.name === 'status' && event.target.value === 'Delete') {
			this.handleDelete();
		} else {
			this.setState({
				[event.target.name]: event.target.value
			});
		}
	}

	/**
	 * Calls the parent's function to handle deleting this task
	 */
	handleDelete() {
		this.props.handleDelete();
	}
	
	/**
	 * Toggles the expand feature of the task
	 */
	toggleExpand() {
		let isExpanded = this.state.isExpanded;
		this.setState({isExpanded: !isExpanded});
	}

	/**
	 * Used for sending the JSON of this task to the server
	 */
	toJSON() {
		return {
			projectId: this.state.projectId,
			title: this.state.title,
			status: this.state.status,
			teamMembers: this.state.teamMembers,
			comments: this.state.comments
		};
	}
}

export default ProjectListItem;
