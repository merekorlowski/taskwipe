import React, { Component } from 'react';
import './styles.css';
import { Route } from 'react-router-dom';
import App from '../../App/index'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			username:'',
			password:'',
			invalidPassword: false
		}
	}

	login(self) {

		//event.preventDefault();

		//if (!(self.props.invalidPassword)) {
			console.log('inside invalidPassword');
			this.state.context.router.transitionTo('./Schedule/index.js');
		//}
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