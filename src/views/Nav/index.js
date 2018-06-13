import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { logout } from '../../actions/session';
import TextIcon from '../../components/TextIcon';
import './styles.scss';

class Nav extends Component {
	static propTypes = {
		logout: func.isRequired
	};

	logout = () => {
		this.props.logout();
	}

	render() {
		return (
			<div>
				<header>
					<nav>
						<div className="tw-page-width">
							<span className="left">
								<span id="logo">taskwipe</span>
								<ul>
									<li><NavLink exact to="/tasks"
											activeClassName="active"
										>
											<TextIcon
												icon="fa fa-tasks"
												text="Tasks"
												iconArrangement="left"
											/>
										</NavLink>
									</li>
									<li>
										<NavLink exact to="/projects"
											activeClassName="active"
										>
											<TextIcon
												icon="fas fa-sitemap"
												text="Projects"
												iconArrangement="left"
											/>
										</NavLink>
									</li>
									<li>
										<NavLink exact to="/time"
											activeClassName="active"
										>
											<TextIcon
												icon="fa fa-clock"
												text="Time"
												iconArrangement="left"
											/>
										</NavLink>
									</li>
								</ul>
							</span>
							<span>
								<ul className="right">
									{/* <li>
										<NavLink exact to="/settings"
											activeClassName="active"
										>
											<i className="fa fa-cog" />
										</NavLink>
									</li> */}
									<li>
										<button className="sign-out-btn" onClick={this.logout}>
											<i className="fa fa-sign-out-alt" />
										</button>
									</li>
								</ul>
							</span>
						</div>
					</nav>
				</header>
			</div>
		);
	}
}

export default withRouter(connect(null, {
	logout
})(Nav));
