import React, { Component } from 'react';
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
				<div className="container">
					<h2>Login</h2>
					<div className="title-underline bg-theme"></div>
					<div>
						<form onSubmit={this.login}>
							<div class="col-md-6 col-lg-6 col-sm-10">
								<div className="form-row">
									<input id="email" type="text" autoFocus="on" className="form-elem" name="email" placeholder="Email"
										value={this.state.email} onChange={this.handleChange} />
								</div>
								<div className="form-row">
									<input id="password" type="password" className="form-elem" name="password" placeholder="Password"
										value={this.state.password} onChange={this.handleChange} />
								</div>
								<div>
									<button type="submit" className="bg-theme-btn right">Sign in</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			);
		}
	}
}

export default Login;
