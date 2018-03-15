import React, { Component } from 'react';
import './styles.css';
import LoginService from '../../services/login';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

/** Login page component */
class Login extends Component {
	/**
	 * A log in component
	 * @constructor
	 */
	constructor(props) {
		super(props);
		this.loginService = new LoginService();
		this.state = {
			email: '',
			password: '',
			invalidEmail: false,
			invalidPassword: false
		};

		// The binding is mandatory to make "this" work in the callback
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
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
	handleChange(event) {
		// The change is stored in the change data structure
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	/** Attempts to log in with the given credentials */
	login(event) {
		event.preventDefault();
		if (this.state.email === '') {
			this.setState({invalidEmail: true});
		}

		if (this.state.password === '') {
			this.setState({invalidPassword: true});
		}

		if (!this.state.invalidEmail && !this.state.invalidPassword) {
			this.loginService.login(this.state.email, this.state.password).then(res => {
				if (!('unauthenticated' in res.data)) {
					localStorage.setItem('loggedIn', true);
					this.props.history.push('/tasks');
				}
			});
		}
	}

	/** Renders the login page */
	render() {
		if (localStorage.getItem('loggedIn') === 'true') {
			return (<Redirect to="/tasks" />);
		} else {
			return (
				<div className="Login">
					<section className="content">
						<h1>Login</h1>
						<div className="title-underline background-theme"></div>
						<form id="loginForm" onSubmit={this.login}>
							<p>
								<input name="email" type="email" autoFocus="on" placeholder="Enter your email"
									value={this.state.email} onChange={this.handleChange} />
							</p>
							<p>
								<input name="password" type="password" placeholder="Enter your password"
									value={this.state.password} onChange={this.handleChange} />
							</p>
							<p>
								<button type="submit" className="">Sign in</button>
							</p>
						</form>
					</section>
				</div>
			);
		}
	}
}

export default Login;
