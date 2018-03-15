import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './styles.css';
import Nav from '../Nav';
import Login from '../Login';
import Tasks from '../Tasks/index';
import Projects from '../Projects/index';
import Activity from '../Activity/index';
import PrivateRoute from '../PrivateRoute';

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
						<PrivateRoute path="/activity" component={Activity} />
						<Redirect from="*" to="/tasks"/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
