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
import { fetchNumberOfCommentsForPost } from '../../actions/comments'


// Components
import Icon from '../Icon/Icon'

class PostList extends Component {

  fetchNumberOfCommentsForPost = (postId) => {
    let commentNumber = this.props.fetchNumberOfCommentsForPost(postId)
    console.log('# ', commentNumber)
  }

  render() {
    let { posts, comments, sortOrder } = this.props;

    console.log('all comments? ', comments)

    posts.sort(function(a, b) {
      if(sortOrder === 'voteScore') {
        return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      } else return posts
    });

    return (
      <div className="post-list-container">
        <ul className='post-list'>
          {posts.map( (post) =>
            <li key={post.id} className="post">
              <div className="post-vote-container">
                <div className="post-vote">
                  <div
                    className="post-vote-up"
                    onClick={() => this.props.upVotePost(post.id)}
                  >
                    <Icon type="triangle-up" />
                  </div>
                  <div className="post-vote-score">
                    {post.voteScore}
                  </div>
                  <div
                    className="post-vote-down"
                    onClick={() => this.props.downVotePost(post.id)}
                  >
                    <Icon type="triangle-down" />
                  </div>
                </div>
              </div>
              <div className="post-info">
                <Link
                  className="post-title"
                  to={`post/${post.id}`}
                >
                  {post.title}
                </Link>
                <div className="post-meta">
                  <div className="post-submission-info">
                    Submitted {getNumberOfDaysFromDate(post.timestamp)} days ago by
                    <span className="post-author">
                      {post.author}
                    </span>
                    {this.fetchNumberOfCommentsForPost(post.id)}
                  </div>
                  <div className="post-category">
                    Category:
                    <span className="post-category-pill">
                      {post.category}
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

function mapStateToProps ({ posts, comments, sortOrder }) {
  return {
    posts,
    comments,
    sortOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, true)),
    downVotePost: (id) => dispatch(voteOnPost(id, false)),
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption)),
    getCategoryPosts: (category) => dispatch(getPostsByCategory(category)),
    fetchNumberOfCommentsForPost: (id) => dispatch(fetchNumberOfCommentsForPost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
