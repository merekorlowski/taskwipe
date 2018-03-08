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
			invalidUsername: false,
			invalidPassword: false
		}
	}

	login(self) {

		if (self.state.username === '') {
    		self.state.invalidStaffname = true
    	}

	    if (self.state.password === '') {
	    	self.state.invalidPassword = true
	    }

	    if (!self.state.username && !self.state.password) {
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