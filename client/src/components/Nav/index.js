import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import Settings from '../Settings';
import './styles.css';

/** Main navigation component */
class Nav extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.toggleSettings = this.toggleSettings.bind(this);
		this.state = {
			isDisplayingSettings: false
		}
	}

	toggleSettings() {
		this.setState({isDisplayingSettings: !this.state.isDisplayingSettings});
	}

	logout(event) {
		localStorage.setItem('loggedIn', 'false');
		window.location = '/login';
	}

	renderNavIfLoggedIn() {
		if (localStorage.getItem('loggedIn') === 'true') {
			return (
				<nav className="navbar navbar-inverse">
					<div className="container">
						<span id="logo" className="navbar-header">
							<NavLink to="/tasks" activeClassName="none">
								<span id="task" className="navbar-brand">taskwipe</span>
							</NavLink>
						</span>
						<ul className="nav navbar-nav">
							<li className="active">
								<NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
							</li>
							<li>
								<NavLink to="/projects" activeClassName="active">Projects</NavLink>
							</li>
							<li>
								<NavLink to="/activity" activeClassName="active">Activity</NavLink>
							</li>
						</ul>
						<button type="button" className="navbar-right navbar-btn btn" onClick={this.toggleSettings}>
							<i className="glyphicon glyphicon-menu-hamburger"></i>
						</button>
					</div>
				</nav>
			);
		} else {
			return (
				<nav className="navbar navbar-default">
					<div className="container">
						<span className="navbar-header">
							<span id="task" className="navbar-brand">taskwipe</span>
						</span>
					</div>
				</nav>
			);
		}
	}

	render() {
		return (
			<div>
				<header>
					{this.renderNavIfLoggedIn()}
				</header>
				{this.state.isDisplayingSettings ? (<Settings />) : ''}
			</div>
		);
	}
}

export default Nav;
