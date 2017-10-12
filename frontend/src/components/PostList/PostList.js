import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'

// Actions
import { fetchPosts, voteOnPost, sortPosts } from '../../actions/posts'


// Components
import Icon from '../Icon/Icon'

class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts()
    this.props.sortPostList('voteScore')
  }

  getNumberOfDaysFromDate(datePast) {
    // //Get 1 day in milliseconds
    let oneDay=1000*60*60*24;
    let dateToday = Date.now();

    // // Calculate the difference in milliseconds
    let differenceInMS = dateToday - datePast;
    return Math.round(differenceInMS/oneDay);
  }

  render() {
    let { posts } = this.props;

    return (
      <div className="post-list-container">
        <ul className='post-list'>
          {Object.keys(posts).map( (post) =>
            <li key={posts[post].id} className="post">
              <div className="post-vote">
                <div
                  className="post-vote-up"
                  onClick={() => this.props.upVotePost(posts[post].id)}
                >
                  <Icon type="triangle-up" />
                </div>
                <div className="post-vote-score">
                  {posts[post].voteScore}
                </div>
                <div
                  className="post-vote-down"
                  onClick={() => this.props.downVotePost(posts[post].id)}
                >
                  <Icon type="triangle-down" />
                </div>
              </div>
              <div className="post-info">
                <a href="" className="post-title">
                  {posts[post].title}
                </a>
                <div className="post-meta">
                  <div className="post-submission-info">
                    Submitted {this.getNumberOfDaysFromDate(posts[post].timestamp)} days ago by
                    <span className="post-author">
                      {posts[post].author}
                    </span>
                  </div>
                  <div className="post-category">
                    Category:
                    <span className="post-category-pill">
                      {posts[post].category}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
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
    fetchAllPosts: () => dispatch(fetchPosts()),
    upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    downVotePost: (id) => dispatch(voteOnPost(id, 'downVote')),
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
