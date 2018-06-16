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
		login: func.isRequired,
		session: object.isRequired
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
					<div className="login-background"></div>
					<form 
						className="login-form"
						onSubmit={this.onSubmit}
					>
						<h2 className="text-color--primary tw-title">Welcome to taskwipe!</h2>
						<h3 className="centered">Log in to your account.</h3>
						<div>
							<div>
								<input
									id="email"
									type="text"
									autoFocus="on"
									className="tw-form-elem col-12"
									name="email"
									placeholder="Email"
									value={credentials.email}
									onChange={this.onChange}
								/>
							</div>
							<div>
								<input
									id="password"
									type="password"
									className="tw-form-elem col-12"
									name="password"
									placeholder="Password"
									value={credentials.password}
									onChange={this.onChange}
								/>
							</div>
							<div>
								<button type="submit" className="tw-btn col-12">
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
