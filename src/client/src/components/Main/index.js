import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';
import Nav from '../Nav';
import Content from '../Content';

/**Base component of the application, contains nav and content */
class Main extends Component {
	/**
	 * @constructor
	 * @param {*} props 
	 */
	constructor(props) {
		super(props);
	}

	render() {		
		if (localStorage.getItem('loggedIn') === 'true') {
			return (
				<div>
					<Nav />
					<Content history={this.props.history}/>
				</div>
			);
		} else {
			return (
				<Redirect to="/login" />
			);
		}
	}
}

export default Main;
