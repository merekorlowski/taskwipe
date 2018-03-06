import React, { Component } from 'react';
import './styles.css';
import Nav from '../Nav/index';
import Content from '../Content/index';

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
