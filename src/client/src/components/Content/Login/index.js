import React, { Component } from 'react';
import './styles.css';
import LoginService from '../../../services/login'

class Login extends Component {
	constructor(props) {
		super(props);
		this.loginService = new LoginService();
		this.state={
			username:'',
			password:'',
			invalidPassword: false
		}
	}

	login(self) {
		this.loginService.login(self.state).then(res => {
			let login = res.login;
			this.setState({login: login});
		});
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
					onChange = {(event,newValue) => this.setState({username:newValue})}
		    />
		    <br/>
		    <br/>
				<input
					name="password"
					type="password"
					value={this.state.password}
					placeholder="Enter your Password"
					onChange = {(event,newValue) => this.setState({password:newValue})}
				/>
		    <br/>
		    <br/>
		    <button
		    	type="button"
		    	label="Submit"
		    	onClick={(event) => this.login.bind(this)}>
		    	Sign in
		    </button>
		</div>
		);
	}
}

export default Login;