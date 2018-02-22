import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles.css';
import Home from '../Home/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
