import React, { Component } from 'react'
import { connect } from 'react-redux'

// Utilities
import { getNumberOfDaysFromDate } from '../../utils/utils'

// Actions
import {
  createComment,
  voteOnComment,
  updateComment,
  deleteComment
} from '../../actions/comments'

class Comment extends Component {
  state = {
    comment: {
      id: '',
      parentId: "",
      timestamp: '',
      body: '',
      author: 'George Harrison',
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    },
    editingComment: false
  }

  componentDidMount() {
    let { commentObject } = this.props

    this.setState(state => ({
      ...state,
      comment: commentObject
    }))
  }


  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      comment: {
        ...state.comment,
        ...newPartialInput,
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let updatedComment = this.state.comment
    let timestamp = Date.now()
    let detail = updatedComment.body

    this.props.updateComment(updatedComment.id, timestamp, detail)

    this.setState(state => ({
      ...state,
      comment: updatedComment,
      editingComment: false
    }))
  }

  handleDelete = (event) => {
    event.preventDefault()
  }

  handleEditComment = (event) => {
    this.setState(state => ({
      ...state,
      editingComment: true
    }))
  }

  handleDeleteComment = (event) => {
    event.preventDefault()

    this.props.deleteComment(this.state.comment.id)
  }

  render() {
    let { commentObject } = this.props
    let { comment } = this.state

    return (
      <div className="comment">
        <div className="comment-meta">
          {commentObject.author}  |  {getNumberOfDaysFromDate(commentObject.timestamp)} days ago
        </div>
        <div className="comment-body">
          <span className={`${this.state.editingComment ? 'hide' : ''}`}>
            {commentObject.body}
          </span>

          <form
            onSubmit={(event) => this.handleSubmit(event)}
            className={`edit-comment-form ${this.state.editingComment ? 'active' : ''}`}>
            <textarea
              name="comment"
              type="text"
              placeholder="Add a Comment"
              value={comment.body}
              onChange={event => this.handleInputChange({body: event.target.value})}
            />
            <button
              className="cta"
              onClick={(event) => this.handleSubmit(event)}
            >
              Save Changes
            </button>
          </form>
        </div>
        <div className="comment-actions">
          <div className="comment-vote-container">
            <div className="comment-voter-arrows">
              <div
                className="comment-voter up"
                onClick={() => this.props.upVoteComment(commentObject.id)}
              />
              <div
                className="comment-voter down"
                onClick={() => this.props.downVoteComment(commentObject.id)}
              />
            </div>
            {commentObject.voteScore} points
          </div>
          <div
            className={`comment-edit-delete ${this.state.editingComment ? 'hide' : ''}`}
          >
            <a
              onClick={(event) => this.handleEditComment(event)}
            >
              Edit
            </a>
            <a
              onClick={(event) => this.handleDeleteComment(event)}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteComment: (id) => dispatch(voteOnComment(id, true)),
    downVoteComment: (id) => dispatch(voteOnComment(id, false)),
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (commentId, timestamp, detail) => dispatch(updateComment(commentId, timestamp, detail)),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)