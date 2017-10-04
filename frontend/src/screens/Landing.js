import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import PostList from '../components/PostList/PostList'
import CategoryList from '../components/CategoryList/CategoryList'
import Nav from '../components/Nav/Nav'
import PostFilter from '../components/PostFilter/PostFilter'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Helmet>
            <title>Udacilist | Welcome!</title>
        </Helmet>
        <Nav />
        <PostFilter />
        <div className="wrap">
          <div className="landing-canvas">
            <div className="landing-canvas-content">
              <PostList />
            </div>
            <div className="landing-canvas-sidebar">
              <CategoryList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
