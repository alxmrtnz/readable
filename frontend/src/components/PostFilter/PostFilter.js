import React, { Component } from 'react';

class PostFilter extends Component {
  render() {
    return (
      <div className="post-filter">
        <div className="wrap">
          <ul className="post-filter-list">
            <li className="post-filter-list-item active">
              Top
            </li>
            <li className="post-filter-list-item">
              New
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PostFilter;
