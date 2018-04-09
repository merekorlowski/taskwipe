import React, { Component } from 'react';
import SettingsService from '../../services/settings';
import './styles.css';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.settingsService = new SettingsService();

		this.state = {
			employeeId: '',
			numOfWeeksAhead: '',
			showDeadlineForTask: false,
			teamColor: '',
			teamName: ''
		};
	}

	componentDidMount() {
		this.getUserSettings();
	}

	render() {
		return (
			<div className="container">
				<p>
					<button className="bg-theme-btn right" onClick={this.logout}>Logout</button>
				</p>
				<h2>Settings</h2>
				<div className="title-underline bg-theme"></div>
				<ul className="list">
					<li>
						<div className="container">
							<h3>Display Settings</h3>
							<span className="col-xs-5">Number of Weeks to Show in Tasks Page:</span>
							<span className="col-xs-5">
								<input type="number" className="form-elem" name="numOfWeeksAhead" value={this.state.numOfWeeksAhead} onChange={this.handleChange.bind(this)}/>
							</span>
							<span className="col-xs-5">Show Deadlines in Tasks Page?</span>
							<span className="col-xs-5">
								<input type="checkbox" className="form-elem" name="showDeadlineForTask" checked={this.state.showDeadlineForTask} onChange={this.handleChange.bind(this)}/>
							</span>
						</div>
					</li>
					<li>
						<div className="container">
							<h3>Team Settings</h3>
							<span className="col-xs-5">Team Name:</span>
							<span className="col-xs-5">
								<input type="text" className="form-elem" name="teamName" value={this.state.teamName} onChange={this.handleChange.bind(this)}/>
							</span>
							<span className="col-xs-5">Team Color:</span>
							<span className="col-xs-5">
								<input type="color" name="teamColor" value={this.state.teamColor} onChange={this.handleChange.bind(this)}/>
							</span>
						</div>
					</li>
				</ul>
			</div>
		);
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	getUserSettings() {
		this.settingsService.getUserSettings('e1').then(res => {
			this.setState(
				{...res.data}
			);
		}).catch(err => {
			console.error(err);
		});
	}

	logout() {
		localStorage.setItem('loggedIn', 'false');
		window.location = '/login';
	}
}

export default Settings;
