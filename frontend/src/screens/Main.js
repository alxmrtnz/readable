import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import CategoryList from '../components/CategoryList'
import Nav from '../components/Nav'
import PostFilter from '../components/PostFilter'
import PostList from '../components/PostList'

class Main extends Component {
  render() {
    let currentCategory = null
    if (this.props.match.params.category) {
      currentCategory = this.props.match.params.category
    }

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
              <PostList category={currentCategory}/>
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

export default Main;
