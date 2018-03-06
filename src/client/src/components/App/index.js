import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles.css';
import MaterialIcon from 'material-icons-react';
import Schedule from '../Schedule/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section id="navSection">
          <div id="navContent">
            <nav id="nav">
              <ul>
                <li id="titleLink"><a href="/#/"><h1>Engineering Outreach</h1></a></li>
                <li><a href="/#/"><span>Schedule</span><MaterialIcon icon="schedule"/></a></li>
                <li><a href="/#/ideas"><span>Ideas</span><MaterialIcon icon="lightbulb_outline"/></a></li>
              </ul>
            </nav>
          </div>
        </section>
        <section id="mainSection">
          <span id="settings">
            <MaterialIcon icon="menu"/>
            <ul>
              <li>Logout</li>
            </ul>
          </span>
          <Switch>
            <Route path="/" component={Schedule} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
