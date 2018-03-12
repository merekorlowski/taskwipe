import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';
import LoginService from '../../services/login';

/**Login page component */
class Login extends Component {
	/**
	 * A log in component
	 * @constructor
	 * */
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

	/** Attempts to log in with the given credentials*/
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
					localStorage.setItem('loggedIn', 'true');
					this.props.history.push('/tasks');
				}
			});
		}
	}

	/** Renders the login page */
	render() {
		if (localStorage.getItem('loggedIn') === 'false') {
			return (
				<div className="Login">
					<div id="banner">
						<div className="content" id="bannerContent">
							<span id="task">task</span>wipe
						</div>
					</div>
					<section className="content">
						<h1>Login</h1>
						<div className="title-underline"></div>
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
								<button type="submit">Sign in</button>
							</p>
						</form>
					</section>
				</div>
			);
		} else {
			return (
				<Redirect to="/"/>
			);
		}
	}
}

export default Login;
