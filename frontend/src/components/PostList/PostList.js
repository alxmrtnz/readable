import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNumberOfDaysFromDate } from '../../utils/utils'

// Actions
import {
  voteOnPost,
  sortPosts,
  getPostsByCategory
} from '../../actions/posts'


// Components
import Icon from '../Icon/Icon'

class PostList extends Component {

  render() {
    let { posts } = this.props;

    return (
      <div className="post-list-container">
        <ul className='post-list'>
          {Object.keys(posts).map( (post) =>
            <li key={posts[post].id} className="post">
              <div className="post-vote-container">
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
              </div>
              <div className="post-info">
                <Link
                  className="post-title"
                  to={`post/${posts[post].id}`}
                >
                  {posts[post].title}
                </Link>
                <div className="post-meta">
                  <div className="post-submission-info">
                    Submitted {getNumberOfDaysFromDate(posts[post].timestamp)} days ago by
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
    upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    downVotePost: (id) => dispatch(voteOnPost(id, 'downVote')),
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption)),
    getCategoryPosts: (category) => dispatch(getPostsByCategory(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
