import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './index';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Schedule />, div);
	ReactDOM.unmountComponentAtNode(div);
});
