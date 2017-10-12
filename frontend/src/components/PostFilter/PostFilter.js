import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { sortPosts } from '../../actions/posts'

// Components
import Button from '../Button/Button'

class PostFilter extends Component {
  state = {
    activeTab: "tab-1"
  }

  renderActiveClass(tab) {
    if (tab === this.state.activeTab) {
      return 'active'
    }
  }

  handleTabClick = (event) => {
    let targettedTab = event.target.getAttribute('data-structure')
    let sortBehavior = event.target.getAttribute('data-behavior')

    this.props.sortPostList(sortBehavior)

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

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFilter)
