import React, { Component } from 'react';
import './styles.css';
import Nav from '../Nav/index';
import Content from '../Content/index';

/**Base component of the application, contains nav and content */
class App extends Component {
	render() {
		return (
			<div className="App">
				<Nav />
				<Content />
			</div>
		);
	}
}

export default App;
