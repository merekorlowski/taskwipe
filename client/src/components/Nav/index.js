import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

/** Main navigation component */
class Nav extends Component {
	render() {
		return (
			<div>
				<header>
					<nav>
						<div className="container">
							<span className="left">
								<span id="logo">
									{this.isLoggedIn() && (
										<NavLink to="/tasks" activeClassName="none">
											taskwipe
										</NavLink>
									)}
								</span>
								{this.isLoggedIn() && (
									<ul>
										<li className={this.isActive('/tasks') ? 'active' : ''}>
											<NavLink to="/tasks" className="bg-theme-link">
												Tasks
											</NavLink>
										</li>
										<li className={this.isActive('/projects') ? 'active' : ''}>
											<NavLink to="/projects" className="bg-theme-link">
												Projects
											</NavLink>
										</li>
										<li className={this.isActive('/time') ? 'active' : ''}>
											<NavLink to="/time" className="bg-theme-link">
												Time
											</NavLink>
										</li>
									</ul>
								)}
							</span>
							{this.isLoggedIn() && (
								<span>
									<ul className="right">
										{/* <span className="col-xs-9">{'Hello ' + localStorage.getItem('employeeName')}</span> */}
										<li className={this.isActive('/settings') ? 'active' : ''}>
											<NavLink
												to="/settings"
												activeClassName="active"
												className="bg-theme-link"
											>
												<i className="fa fa-cog" />
											</NavLink>
										</li>
										<li className={this.isActive('/settings') ? 'active' : ''}>
											<button className="sign-out-btn" onClick={this.logout}>
												<i className="fa fa-sign-out-alt" />
											</button>
										</li>
									</ul>
								</span>
							)}
						</div>
					</nav>
				</header>
			</div>
		);
	}

	isActive(pathname) {
		return window.location.pathname === pathname;
	}

	isLoggedIn() {
		return localStorage.getItem('loggedIn') === 'true';
	}

	logout = () => {
		localStorage.setItem('loggedIn', 'false');
		window.location = '/login';
	};
}

export default Nav;
