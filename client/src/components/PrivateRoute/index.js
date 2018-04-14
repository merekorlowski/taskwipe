import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class PrivateRoute extends Component {
	static get propTypes() {
		return {
			path: PropTypes.string.isRequired,
			component: PropTypes.func.isRequired
		};
	}
	render() {
		let isLoggedIn = localStorage.getItem('loggedIn') === 'true';
		let { path, component } = this.props;

		if (isLoggedIn) {
			return <Route path={path} component={component} />;
		} else {
			return <Redirect to="/login" />;
		}
	}
}

export default PrivateRoute;
