import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
	static propTypes = {
		path: string.isRequired,
		component: func.isRequired,
		session: object.isRequired
	};

	render() {
		let { path, component, session } = this.props;
		if (session.isActive) {
			return <Route path={path} component={component} />;
		} else {
			return <Redirect to="/login" />;
		}
	}
}

const mapStateToProps = state => ({
	session: state.sessionReducer
});

export default connect(mapStateToProps, {})(PrivateRoute);
