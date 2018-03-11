import React, {Component} from 'react';
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
	login() {
		if (this.state.email === '') {
			this.setState({invalidEmail: true});
		}

		if (this.state.password === '') {
			this.setState({invalidPassword: true});
		}

		if (!this.state.email && !this.state.password) {
			this.loginService.login().then(res => {
				let login = res.data;
			});
		}
	}

	/** Renders the login page */
	render() {
		return (
			<div className="Login">
				<h1>Login</h1>
				<input name="email" type="text" placeholder="Enter your email"
					value={this.state.email} onChange={this.handleChange} />
				<input name="password" type="password" placeholder="Enter your password"
					value={this.state.password} onChange={this.handleChange} />
				<button type="submit" onClick={this.login}>Sign in</button>
			</div>
		);
	}
}

export default Login;
