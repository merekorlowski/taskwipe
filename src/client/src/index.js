import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Content/Login/index.js';

ReactDOM.render(
    <BrowserRouter>
        <Login />
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
