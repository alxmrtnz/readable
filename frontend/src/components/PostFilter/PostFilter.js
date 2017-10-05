import React, { Component } from 'react';

// Components
import Button from '../Button/Button'

class PostFilter extends Component {
  render() {
    return (
      <div className="post-filter">
        <div className="wrap">
          <div className="post-filter-inner">
            <ul className="post-filter-list">
              <li className="post-filter-list-item active">
                Top
              </li>
              <li className="post-filter-list-item">
               <a href="/category">New</a>
              </li>
            </ul>
            <div className="post-filter-button-container">
              <Button
                label="Add Post"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostFilter;
