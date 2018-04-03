import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap-grid';
import Nav from '../Nav';
import Login from '../Login';
import Tasks from '../Tasks';
import Projects from '../Projects';
import Time from '../Time';
import Settings from '../Settings';
import PrivateRoute from '../PrivateRoute';
import './styles.css';

/** Base component of the application, contains nav and content */
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Nav />
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRoute path="/tasks" component={Tasks} />
						<PrivateRoute path="/projects" component={Projects} />
						<PrivateRoute path="/time" component={Time} />
						<PrivateRoute path="/settings" component={Settings} />
						<Redirect from="*" to="/tasks"/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
