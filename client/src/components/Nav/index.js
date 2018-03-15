import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
import MaterialIcon from 'material-icons-react';

/** Main navigation component */
class Nav extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(event) {
		localStorage.setItem('loggedIn', 'false');
		window.location = '/login';
	}

	renderNavIfLoggedIn() {
		if (localStorage.getItem('loggedIn') === 'true') {
			return (
				<nav className="content" id="navContent">
					<span>
						<span id="logo"><NavLink to="/tasks" activeClassName="none">
							<span id="task">task</span><span id="wipe">wipe</span></NavLink>
						</span>
						<ul>
							<li className="background-theme-link"><NavLink to="/tasks" activeClassName="active">Tasks</NavLink></li>
							<li className="background-theme-link"><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
							<li className="background-theme-link"><NavLink to="/activity" activeClassName="active">Activity</NavLink></li>
						</ul>
					</span>
					<button id="settingsBtn" className="background-theme-btn" onClick={this.logout}>
						<MaterialIcon icon="menu" />
					</button>
				</nav>
			);
		} else {
			return (
				<nav className="content" id="navContent">
					<span id="logo">
						<span id="task">task</span><span id="wipe">wipe</span>
					</span>
				</nav>
			);
		}
	}

	render() {
		return (
			<div>
				<header id="navSection" className="background-theme">
					{this.renderNavIfLoggedIn()}
				</header>
			</div>
		);
	}
}

export default Nav;
