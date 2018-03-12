import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './styles.css';
import MaterialIcon from 'material-icons-react';
import Tasks from '../Tasks/index';
import Projects from '../Projects/index';
import Activity from '../Activity/index';

/**Content component which routes the different pages */
class Content extends Component {
	constructor(props) {
		super(props);
		
		this.logout = this.logout.bind(this);
	}

	logout(event) {
		localStorage.setItem('loggedIn', 'false');
		this.props.history.push('/login');
	}

	render() {
		return (
			<div className="content" id="mainSection">
				<span id="settings" onClick={this.logout}>
					Logout
				</span>
				<Route path="/tasks" component={Tasks} />
				<Route path="/projects" component={Projects} />
				<Route path="/activity" component={Activity} />
			</div>
		);
	}
}

export default Content;
