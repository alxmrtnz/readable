import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {

  render() {
    return (
      <nav className="nav">
        <div className="wrap">
          <div className="nav-logo">
            <Link
              to="/"
            >
              Udacilist
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;