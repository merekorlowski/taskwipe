import React, { Component } from 'react';
import SettingsService from '../../services/settings';
import './styles.css';

class Settings extends Component {
	constructor(props){
    super(props);
    this.settingsService = new SettingsService();

    this.settingsData = {
      employeeId: '',
      numOfWeeksAhead: '',
      showDeadlineForTask: false,
      teamColor: ''
    }
    this.state = {
      settingsData: this.settingsData
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
            <h3>Display Settings</h3>
            <div className="settingsItem">
              <span>Number of Weeks to Show in Tasks Page:</span>
              <span>
                <input type="number" name="numOfWeeksAhead" defaultValue={this.state.settingsData.numOfWeeksAhead} onChange={this.handleChange.bind(this)}/>
              </span>
            </div>
            <div className="settingsItem">
              <span>Show Deadlines in Tasks Page?</span>
              <span>
                <input type="checkbox" defaultChecked={this.state.settingsData.showDeadlineForTask} onChange={this.handleChange.bind(this)}/>
              </span>
            </div>
          </li>
          <li>
            <h3>Team Settings</h3>
            <div className="settingsItem">
              <span>Team Color:</span>
              <span>
                <input type="color" name="teamColor" defaultValue={this.state.settingsData.teamColor} onChange={this.handleChange.bind(this)}/>
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
      let settingsData = this.state.settingsData;
      settingsData = {...res.data[0]};
      this.setState({
        settingsData: settingsData
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
