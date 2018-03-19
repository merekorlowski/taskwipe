import React, { Component } from 'react';
import './styles.css';

class Settings extends Component {
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
	
	logout() {
		localStorage.setItem('loggedIn', 'false');
		window.location = '/login';
	}
}

export default Settings;
