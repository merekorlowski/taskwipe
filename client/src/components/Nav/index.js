import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { logout } from '../../actions/session';
import TextIcon from '../TextIcon';
import './styles.scss';

class Nav extends Component {
	static propTypes = {
		logout: func.isRequired
	};

	get	currentPath() {
		return window.location.pathname;
	}

	logout = () => {
		this.props.logout();
	}

	render() {
		const { session } = this.props;
		return (
			<div>
				<header>
					<nav>
						<div className="tw-page-width">
							<span className="left">
								<span id="logo">
									taskwipe
								</span>
								{session.isActive && (
									<ul>
										<li className={this.currentPath === '/tasks' ? 'active' : ''}>
											<NavLink to="/tasks">
												<TextIcon
													icon="fa fa-tasks"
													text="Tasks"
													iconArrangement="left"
												/>
											</NavLink>
										</li>
										<li className={this.currentPath === '/projects' ? 'active' : ''}>
											<NavLink to="/projects">
												<TextIcon
													icon="fas fa-sitemap"
													text="Projects"
													iconArrangement="left"
												/>
											</NavLink>
										</li>
										<li className={this.currentPath === '/time' ? 'active' : ''}>
											<NavLink to="/time">
												<TextIcon
													icon="fa fa-clock"
													text="Time"
													iconArrangement="left"
												/>
											</NavLink>
										</li>
									</ul>
								)}
							</span>
							{session.isActive && (
								<span>
									<ul className="right">
										<li className={this.currentPath === '/settings' ? 'active' : ''}>
											<NavLink to="/settings">
												<i className="fa fa-cog" />
											</NavLink>
										</li>
										<li>
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
}

const mapStateToProps = state => ({
	session: state.sessionReducer
});

export default connect(mapStateToProps, {
	logout
})(Nav);
