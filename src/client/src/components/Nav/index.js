import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <section id="navSection">
          <div id="navContent">
            <nav id="nav">
              <ul>
                <li id="titleLink"><NavLink to="/" activeClassName="none">
                  <h1><span id="task">task</span><span id="wipe">wipe</span></h1></NavLink>
                </li>
                <li><NavLink to="/tasks" activeClassName="active">Tasks</NavLink></li>
                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                <li><NavLink to="/schedule" activeClassName="active">Schedule</NavLink></li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}

export default Nav;
