import React, {Component} from 'react';
import './styles.css';
import LoginService from '../../../services/login'

class Login extends Component {

	constructor(props) {
		super(props);
		this.loginService = new LoginService();
		this.state={
			username:'',
			password:'',
			invalidUsername: false,
			invalidPassword: false
		}

		//The binding is mandatory to make "this" work in the callback
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	handleChange(event) {
		// The change is stored in the change data structure
		var change = {};
		change[event.target.name] = event.target.value;
		this.setState(change);
	}

	login() {
		if (this.state.username === '') {
			this.setState({invalidUsername: true});
		}

		if (this.state.password === '') {
			this.setState({invalidPassword: true});
		}

		if (!this.state.username && !this.state.password) {
			this.loginService.login().then(res => {
				let login = res.data;
			});
		}
	}

	render() {
		return (
		    <div className="Login">
				<h1>Login</h1>
				<input
					name="username"
					type = "text"
					value={this.state.username}
					placeholder="Enter your Username"
					onChange = {this.handleChange}
		    	/>
				<input
					name="password"
					type="password"
					value={this.state.password}
					placeholder="Enter your Password"
					onChange = {this.handleChange}
				/>
				<button
					type="button"
					label="Submit"
					onClick={this.login}>
					Sign in
				</button>
			</div>
		);
	}
}

export default Login;