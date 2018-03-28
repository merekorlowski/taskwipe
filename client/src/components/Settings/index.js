import React, { Component } from 'react';
import SettingsService from '../../services/settings';
import './styles.css';

class Settings extends Component {
	constructor(props){
    super(props);
    this.state = {
      numOfWeeksAhead: 1,
      showDeadlineForTask: false,
      teamColor: '#19334d'
    };

    this.settingsService = new SettingsService();

	}

	render() {
		return (
			<div className="container">
				<h2>Settings</h2>
				<div className="title-underline bg-theme"></div>
				<p>
					<button className="bg-theme-btn right" onClick={this.logout}>Logout</button>
				</p>
			</div>
		);
  }
  
  getUserSettings(employeeId) {
    this.settingsService.getUserSettings('e1').then(res => {
			this.setState({...res.data});
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
