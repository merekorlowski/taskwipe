import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

/** Main navigation component */
class Nav extends Component {
	render() {
		return (
			<div>
				<header>
					<nav className="bg-theme">
						<div className="container">
							<span className="col-xs-10">
								<span id="logo">
									{this.isLoggedIn() ? (
										<NavLink to="/tasks" activeClassName="none" className="">
											taskwipe
										</NavLink>
									) : <span>taskwipe</span>}
								</span>
								{this.isLoggedIn() ? (
									<ul>
										<li className={this.isActive('/tasks') ? 'active' : ''}>
											<NavLink to="/tasks" className="bg-theme-link">Tasks</NavLink>
										</li>
										<li className={this.isActive('/projects') ? 'active' : ''}>
											<NavLink to="/projects" className="bg-theme-link">Projects</NavLink>
										</li>
										<li className={this.isActive('/time') ? 'active' : ''}>
											<NavLink to="/time" className="bg-theme-link">Time</NavLink>
										</li>
									</ul>
								) : ''}
							</span>
							{this.isLoggedIn() ? (
								<span>
									<ul className="col-xs-2">
										<span>{'Hello ' + localStorage.getItem('employeeName')}</span>
										<li className={this.isActive('/settings') ? 'active' : ''}>
											<NavLink to="/settings" activeClassName="active" className="bg-theme-link">
												<i className="fa fa-cog" />
											</NavLink>
										</li>
									</ul>
								</span>
							) : ''}
						</div>
					</nav>
				</header>
			</div>
		);
	}
	
	isActive(pathname) {
		return (window.location.pathname === pathname);
	}

	isLoggedIn() {
		return (localStorage.getItem('loggedIn') === 'true');
	}
}

export default Nav;
