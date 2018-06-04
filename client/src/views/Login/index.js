import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../actions/session';
import Credentials from '../../models/credentials';
import './styles.scss';

class Login extends Component {
	state = {
		credentials: new Credentials()
	};

	static propTypes = {
		history: object.isRequired,
		login: func.isRequired
	};

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onChange = event => {
		let { credentials } = this.state;
		credentials[event.target.name] = event.target.value;
		this.setState({ credentials });
	};

	/** Attempts to log in with the given credentials */
	onSubmit = event => {
		event.preventDefault();

		let { credentials } = this.state;

		if (credentials.isEmailValid && credentials.isPasswordValid) {
			this.props.login(
				credentials.email,
				credentials.password
			);
		}
	};

	render() {
		const { session } = this.props;
		if (session.isActive) {
			return <Redirect to="/tasks" />;
		} else {
			let { credentials } = this.state;
			return (
				<div>
					<h1 className="tw-page-title">Login</h1>
					<form onSubmit={this.onSubmit}>
						<div>
							<div className="login-form-row">
								<input
									id="email"
									type="text"
									autoFocus="on"
									className="tw-form-elem boxed"
									name="email"
									placeholder="Email"
									value={credentials.email}
									onChange={this.onChange}
								/>
							</div>
							<div className="login-form-row">
								<input
									id="password"
									type="password"
									className="tw-form-elem boxed"
									name="password"
									placeholder="Password"
									value={credentials.password}
									onChange={this.onChange}
								/>
							</div>
							<div className="login-form-row">
								<button type="submit" className="tw-btn right">
									Sign in
								</button>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	session: state.sessionReducer
});

export default connect(mapStateToProps, { login })(Login);
