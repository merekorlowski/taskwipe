import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoginService from '../../services/login';
import './styles.scss';

/** Login page component */
class Login extends Component {
	/**
	 * A log in component
	 * @constructor
	 */
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: '',
				password: ''
			},
			invalidEmail: false,
			invalidPassword: false
		};

		this.loginService = new LoginService();
	}

	/** Renders the login page */
	render() {
		if (localStorage.getItem('loggedIn') === 'true') {
			return <Redirect to="/tasks" />;
		} else {
			let { data } = this.state;
			return (
				<div className="container">
					<h1 className="page-title">Login</h1>
					<form onSubmit={this.onSubmit}>
						<div>
							<div className="login-form-row">
								<input
									id="email"
									type="text"
									autoFocus="on"
									className="form-elem"
									name="email"
									placeholder="Email"
									value={data.email}
									onChange={this.onChange}
								/>
							</div>
							<div className="login-form-row">
								<input
									id="password"
									type="password"
									className="form-elem"
									name="password"
									placeholder="Password"
									value={data.password}
									onChange={this.onChange}
								/>
							</div>
							<div className="login-form-row">
								<button type="submit" className="btn right">
									Sign in
								</button>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}

	static get propTypes() {
		return {
			history: PropTypes.shape({
				push: PropTypes.func.isRequired
			})
		};
	}

	/**
	 * Updates the state when a value is changed
	 * @param {*} event
	 */
	onChange = event => {
		// The change is stored in the change data structure
		let { data } = this.state;
		data[event.target.name] = event.target.value;
		this.setState({
			data
		});
	};

	/** Attempts to log in with the given credentials */
	onSubmit = event => {
		event.preventDefault();
		this.login();
	};

	login() {
		let { email, password } = this.state.data;
		if (email === '') {
			this.setState({ invalidEmail: true });
		}

		if (password === '') {
			this.setState({ invalidPassword: true });
		}

		if (!this.state.invalidEmail && !this.state.invalidPassword) {
			this.loginService
				.login(email, password)
				.then(res => {
					if (!('unauthenticated' in res.data)) {
						localStorage.setItem('loggedIn', true);
						localStorage.setItem('employeeId', res.data.employeeId);
						localStorage.setItem('employeeName', res.data.firstName);
						window.location = '/tasks';
					}
				})
				.catch(err => {
					console.error(err.message);
				});
		}
	}
}

export default Login;
