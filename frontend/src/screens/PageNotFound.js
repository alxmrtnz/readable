import React, { Component } from 'react'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'

// Components
import Nav from '../components/Nav'

class PageNotFound extends Component {

  render() {

    return (
      <div className="page-not-found">
        <Nav />
        <Helmet>
            <title>Udacilist | 404 Page Not Found</title>
        </Helmet>
        <div className="wrap">
          <div className="page-not-found-content">
            <h1 className="page-not-found-heading">
              Page Not Found
            </h1>
            <div className="page-not-found-message">
              <p>
                The page you're looking for is missing or doesn't exist.
              </p>
              <br/>
              <Link to="/">
                Try going back home.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
