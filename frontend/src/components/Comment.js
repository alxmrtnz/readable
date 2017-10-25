import React, { Component } from 'react'
import { connect } from 'react-redux'

// Utilities
import { getNumberOfDaysFromDate } from '../utils/utils'

// Actions
import * as actions from '../actions/comments'

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

  /**
  * @description Receives value from textarea for comment while editing
  * and updates the comment body state
  * @param {Object} newPartialInput - event.target.value of an input
  */
  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      comment: {
        ...state.comment,
        ...newPartialInput,
      }
    }))
  }

  /**
  * @description Handles the form submission of the edited comment. The
  * function adds calls updateComment, passing it the comment's id,
  * and new timestamp and the new 'detail' of the comment (the text
  * of the comment itself). Afterward, it updates 'editingComment' in
  * the comment's state to false to return the UI to the initial state
  * @param {event} event - the form submit event
  */
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

  /**
  * @description Updates the state of the comment to 'editing' mode
  */
  handleEditComment = (event) => {
    this.setState(state => ({
      ...state,
      editingComment: true
    }))
  }

  /**
  * @description Calls the comment action 'deleteComment' to delete
  * the comment in question
  */
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
    upVoteComment: (id) => dispatch(actions.voteOnComment(id, true)),
    downVoteComment: (id) => dispatch(actions.voteOnComment(id, false)),
    createComment: (comment) => dispatch(actions.createComment(comment)),
    updateComment: (commentId, timestamp, detail) => dispatch(actions.updateComment(commentId, timestamp, detail)),
    deleteComment: (id) => dispatch(actions.deleteComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)