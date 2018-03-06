import React, { Component } from 'react';
import './styles.css';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.value = 'fdfsd';
  }
  render() {
    return (
      <div className="Tasks">
        <h1>Tasks</h1>
        <div className="title-underline"></div>
      </div>
    );
  }
}

export default Tasks;
