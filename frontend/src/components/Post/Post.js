import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Utilities
import { getNumberOfDaysFromDate } from '../../utils/utils'

// Actions
import { voteOnPost, deletePost } from '../../actions/posts'
import { fetchCommentsForPost } from '../../actions/comments'

// Components
import Icon from '../Icon/Icon'

class Post extends Component {

  state = {
    numberOfComments: '2'
  }

  componentDidMount() {
    let { postObject } = this.props
    this.props.fetchComments(postObject.id)
    let commentNumber = this.props.comments.length

    if (commentNumber > 0) {
      this.setState(state => ({
        numberOfComments: commentNumber
      }))
    }

  }

  renderCommentNumber() {
    let { postObject, comments } = this.props

    if (postObject !== undefined) {
      var reducedComments = comments.reduce(function(filtered, comment) {
        if (comment.parentId === postObject.id) {
           filtered.push(comment);
        }
        return filtered;
      }, []);

      console.log('number of comments for the post: ', reducedComments.length)
      return reducedComments.length
    }
  }

  renderTitle(postObject) {
    let { postView } = this.props

    if (postView) {
      return (
        <div
          className="post-title"
        >
          {postObject.title}
        </div>
      )
    } else {
      return (
        <Link
          className="post-title"
          to={`post/${postObject.id}`}
        >
          {postObject.title}
        </Link>
      )
    }

  }

  render() {
    let { comments, postObject, history, postView } = this.props

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
                  { this.renderCommentNumber() } comment{comments.length === 1 ? '' : 's'}
                </span>
              </div>
            <div className="post-category">
              Category:
              <span className="post-category-pill">
                {postObject.category}
              </span>
            </div>
          </div>
          <div className={`post-actions ${postView ? '' : 'hide'}`}>
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
    fetchComments: (id) => dispatch(fetchCommentsForPost(id)),
    deletePost: (id, history) => dispatch(deletePost(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)