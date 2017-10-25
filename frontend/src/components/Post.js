import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Utilities
import { getNumberOfDaysFromDate } from '../utils/utils'

// Actions
import { voteOnPost, deletePost } from '../actions/posts'

// Components
import Icon from './Icon'

class Post extends Component {

  state = {
    numberOfComments: '0'
  }

  componentDidMount() {
    let commentNumber = this.props.comments.length

    if (commentNumber > 0) {
      this.setState(state => ({
        numberOfComments: commentNumber
      }))
    }
  }

  /**
  * @description Function that filters the comments from redux store
  * for the current post and then returns the length of the array of
  * comments.
  * @returns {integer} filteredComments.length – the number of comments
  * for the current post
  */
  renderCommentNumber() {
    let { postObject, comments } = this.props

    if (postObject !== undefined) {
      let filteredComments = comments.filter(function(comment) {
        return comment.parentId === postObject.id;
      });
      return filteredComments.length
    }
  }

  /**
  * @description Function that renders the title of the post. If the
  * post is being rendered in PostView.js, it will return a title without
  * a link, while when rendered outside of the post view, it links the title
  * @returns {Object} post title
  */
  renderTitle(postObject) {
    let { postView } = this.props
    return postView ?
      (<div className="post-title" >{postObject.title}</div>)
      :
      (<Link className="post-title" to={`post/${postObject.id}`}>{postObject.title}</Link>)
  }

  render() {
    let { postObject, history, postView } = this.props
    let commentNumber = this.renderCommentNumber()

    return (
      <div className="post">
        <div className="post-vote-container">
          <div className="post-vote">
            <div
              className="post-vote-up"
              onClick={() => this.props.upVotePost(postObject.id)}
            >
              <Icon type="triangle-up" />
            </div>
            <div className="post-vote-score">
              {postObject.voteScore}
            </div>
            <div
              className="post-vote-down"
              onClick={() => this.props.downVotePost(postObject.id)}
            >
              <Icon type="triangle-down" />
            </div>
          </div>
        </div>
        <div className="post-info">
          {this.renderTitle(postObject)}
          <div
            className={`post-body ${postView ? '' : 'hide'}`}

          >
            {postObject.body}
          </div>
          <div className="post-meta">
            <div className="post-submission-info">
                Submitted {getNumberOfDaysFromDate(postObject.timestamp)} days ago by
                <span className="post-author">
                  {postObject.author}
                </span>
                <span>
                  { commentNumber } comment{commentNumber === 1 ? '' : 's'}
                </span>
              </div>
            <div className="post-category">
              Category:
              <span className="post-category-pill">
                {postObject.category}
              </span>
            </div>
          </div>
          <div className="post-actions">
            <Link to={`/post/${postObject.id}/edit`}>
              Edit Post
            </Link>
            <a
              onClick={() => this.props.deletePost(postObject.id, history)}
            >
              Delete Post
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, true)),
    downVotePost: (id) => dispatch(voteOnPost(id, false)),
    deletePost: (id, history) => dispatch(deletePost(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)