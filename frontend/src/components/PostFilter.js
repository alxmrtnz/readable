import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Actions
import { sortPosts } from '../actions/posts'
import { updateSortOrder } from '../actions/sort'

// Components
import Button from './Button'

class PostFilter extends Component {
  state = {
    activeTab: "tab-1"
  }

  /**
  * @description Function that returns an active class for a tab if it
  * is active in the PostFilter's state
  * @params {String} tab – the data-behavior of the selected tab
  */
  renderActiveClass(tab) {
    if (tab === this.state.activeTab) {
      return 'active'
    }
  }

  /**
  * @description Function that handles the click event on the post filter
  * tabs. It then calls sort behavior that changes the order of posts
  * in the redux store (and how they're rendered in PostList.js)
  * @params {Object} event - click event on a tab, used to determine
  * data-behavior from the clicked tab
  */
  handleTabClick = (event) => {
    let targettedTab = event.target.getAttribute('data-structure')
    let sortBehavior = event.target.getAttribute('data-behavior')

    this.props.sortPostList(sortBehavior)
    this.props.updateSortOrder(sortBehavior)
    this.setState(state => ({
      activeTab: targettedTab
    }))
  }

  render() {
    return (
      <div className="post-filter">
        <div className="wrap">
          <div className="post-filter-inner">
            <ul className="post-filter-list">
              <li
                className={`post-filter-list-item ${this.renderActiveClass("tab-1")}`}
                data-structure="tab-1"
                data-behavior="voteScore"
                onClick={(event) => this.handleTabClick(event)}
              >
                Top
              </li>
              <li
                className={`post-filter-list-item ${this.renderActiveClass("tab-2")}`}
                data-structure="tab-2"
                data-behavior="timestamp"
                onClick={(event) => this.handleTabClick(event)}
              >
               New
              </li>
            </ul>
            <div className="post-filter-button-container">
              <Link
                to="/post/add"
              >
                <Button
                  label="Add Post"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption)),
    updateSortOrder: (sortOption) => dispatch(updateSortOrder(sortOption))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFilter)
