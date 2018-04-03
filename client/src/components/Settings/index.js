import React, { Component } from 'react';
import SettingsService from '../../services/settings';
import './styles.css';

class Settings extends Component {
	constructor(props){
    super(props);
    this.settingsService = new SettingsService();

    this.state = {
      employeeId: '',
      numOfWeeksAhead: '',
      showDeadlineForTask: '',
      teamColor: '',
      teamName:''
    };

    this.getUserSettings();

	}

	render() {
		return (
			<div className="container main-section">
				<h2>Settings</h2>
				<p>
					<button className="bg-theme-btn right" onClick={this.logout}>Logout</button>
				</p>
				<div className="title-underline bg-theme"></div>
        <ul className="list">
					<li>
            <h3 className="settings-title">Display Settings</h3>
            <div className="settingsItem">
              <span>Number of Weeks to Show in Tasks Page:</span>
              <span className="settingsValue">
                <input type="number" name="numOfWeeksAhead" value={this.state.numOfWeeksAhead} onChange={this.handleChange.bind(this)}/>
              </span>
            </div>
            <div className="settingsItem">
              <span>Show Deadlines in Tasks Page?</span>
              <span className="settingsValue">
                <input type="checkbox" checked={this.state.showDeadlineForTask} onChange={this.handleChange.bind(this)}/>
              </span>
            </div>
          </li>
          <li>
            <h3 className="settings-title">Team Settings</h3>
            <div className="settingsItem">
              <span>Team Name:</span>
              <span className="settingsValue">
                <input type="text" name="teamName" value={this.state.teamName} onChange={this.handleChange.bind(this)}/>
              </span>
            </div>
            <div className="settingsItem">
              <span>Team Color:</span>
              <span className="settingsValue">
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
    let settingsData = {...this.state.settingsData};
    settingsData[event.target.name] = event.target.value;
		// The change is stored in the change data structure
    this.setState({settingsData: settingsData});
	}
  
  getUserSettings() {
    this.settingsService.getUserSettings('e1').then(res => {
      this.setState({
        ...res.data
      });
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
