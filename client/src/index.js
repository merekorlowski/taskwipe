import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './styles.scss';
import {
	Login,
	Tasks,
	Projects,
	Time,
	Settings
} from './views';
import {
	Nav,
	PrivateRoute
} from './components';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Nav />
				<div className="tw-page-width">
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRoute path="/tasks" component={Tasks} />
						<PrivateRoute path="/projects" component={Projects} />
						<PrivateRoute path="/time" component={Time} />
						<PrivateRoute path="/settings" component={Settings} />
						<Redirect from="*" to="/tasks" />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
