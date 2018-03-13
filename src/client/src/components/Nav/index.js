import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

/** Main navigation component */
class Nav extends Component {
	render() {
		return (
			<div className="Nav">
				<section id="navSection">
					<div className="content" id="navContent">
						<nav id="nav">
							<span id="titleLink"><NavLink to="/tasks" activeClassName="none">
								<span id="task">task</span><span id="wipe">wipe</span></NavLink>
							</span>
							<ul>
								<li><NavLink to="/tasks" activeClassName="active">Tasks</NavLink></li>
								<li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
								<li><NavLink to="/activity" activeClassName="active">Activity</NavLink></li>
							</ul>
						</nav>
					</div>
				</section>
			</div>
		);
	}
}

export default Nav;
