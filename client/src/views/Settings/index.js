import React, { Component } from 'react';

import SettingsService from '../../services/settings';
import EmployeeService from '../../services/employees';
import './styles.scss';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.team = {
			color: '',
			name: '',
			members: []
		};

		this.state = {
			employeeId: '',
			numOfWeeksAhead: '',
			displayDeadlines: false,
			team: null,
			newTeam: { ...this.team }
		};

		this.settingsService = new SettingsService();
		this.employeeService = new EmployeeService();
	}

	componentDidMount() {
		this.getUserSettings();
	}

	render() {
		return (
			<div className="container">
				<h1 className="page-title">Settings</h1>
				<ul className="list">
					<li>
						<div>
							<h3>Display Settings</h3>
							<div className="settings-section">
								<label htmlFor="numOfWeeksAhead">
									Number of weeks to display in Tasks page:
								</label>
								<input
									id="numOfWeeksAhead"
									type="number"
									className="form-elem"
									name="numOfWeeksAhead"
									value={this.state.numOfWeeksAhead}
									onChange={this.onChange}
								/>
							</div>
							<div className="settings-section">
								<label htmlFor="displayDeadlines">
									Display deadlines in Tasks page:
								</label>
								<span>
									<input
										id="displayDeadlines"
										type="checkbox"
										className="form-elem"
										name="displayDeadlines"
										checked={this.state.displayDeadlines}
										onChange={this.onChange}
									/>
								</span>
							</div>
						</div>
					</li>
					<li>
						<h3>Team Management</h3>
						{this.state.team ? this.displayTeam() : this.displayCreateTeam()}
					</li>
				</ul>
			</div>
		);
	}

	displayTeam() {
		let { team } = this.state;
		return (
			<div>
				<div className="settings-section">
					<label htmlFor="teamName">Team Name:</label>
					<input
						id="teamName"
						type="text"
						className="form-elem"
						name="name"
						value={team.name}
						onChange={this.onChange}
					/>
				</div>
				<div className="settings-section">
					<label>Team Color:</label>
					<span>
						<input
							type="color"
							name="teamColor"
							className="form-elem"
							value={team.color}
							onChange={this.onChange}
						/>
					</span>
				</div>
			</div>
		);
	}

	displayCreateTeam() {
		let { newTeam } = this.state;
		return (
			<div className="settings-section">
				<h4>Create Team</h4>
				<form onSubmit={this.createTeam.bind(this)}>
					<label htmlFor="newTeamName">Team name:</label>
					<input
						type="text"
						id="newTeamName"
						name="name"
						placeholder="Team name"
						className="form-elem"
						required="true"
						value={newTeam.name}
						onChange={this.onNewTeamChange}
					/>
					<label htmlFor="newTeamColor">Team color:</label>
					<input
						type="color"
						id="newTeamColor"
						name="color"
						className="form-elem"
						value={newTeam.color}
						onChange={this.onNewTeamChange}
					/>
					<label htmlFor="newTeamMembers">Team members:</label>
					<select
						id="newTeamMembers"
						name="members"
						className="form-elem"
						value={newTeam.members}
						onChange={this.onNewTeamChange}
					>
						<option value="001">Merek Orlowski</option>
					</select>
					<button type="submit" className="btn create-btn">
						Create
					</button>
				</form>
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onNewTeamChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	getUserTeam() {
		this.employeeService
			.getUserTeam(localStorage.getItem('employeeId'))
			.then(res => {
				this.setState({ team: res.data });
			});
	}

	createTeam(event) {
		event.preventDefault();
		this.employeeService
			.createTeam(this.state.newTeam)
			.then(res => {
				this.setState({ team: res.data });
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	getUserSettings() {
		this.settingsService
			.getUserSettings('e1')
			.then(res => {
				this.setState({ ...res.data });
			})
			.catch(err => {
				console.error(err.message);
			});
	}
}

export default Settings;
