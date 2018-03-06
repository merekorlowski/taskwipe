import React, { Component } from 'react';
import './styles.css';

import Calendar from './Calendar/index';

class Schedule extends Component {
  render() {
    return (
      <div className="Schedule">
        <h1>Schedule</h1>
        <div className="title-underline"></div>
        <Calendar/>
      </div>
    );
  }
}

export default Schedule;
