import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles.css';
import Main from '../Main';
import Login from '../Login'

/**Base component of the application, contains nav and content */
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path="/" component={Main} />
					<Route path="/login" component={Login} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
