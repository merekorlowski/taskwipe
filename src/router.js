import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import {
	Login,
	Tasks,
	Projects,
	Time,
	Settings,
	Nav
} from './views';
import { PrivateRoute } from './components';

class Router extends Component {
	static propTypes = {
		session: object.isRequired
	};

	render() {
		let { isActive } = this.props.session;
		return (
			<BrowserRouter>
				<div>
					{isActive && <Nav />}
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRoute path="/tasks" component={Tasks} />
						<PrivateRoute path="/projects" component={Projects} />
						<PrivateRoute path="/time" component={Time} />
						<PrivateRoute path="/settings" component={Settings} />
						<Redirect from="*" to="/tasks" />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => ({
	session: state.sessionReducer
});

export default connect(mapStateToProps, {})(Router);
