import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUniqueKey } from '../utils/utils'

// Actions
import {
  createComment
} from '../actions/comments'

class AddCommentForm extends Component {
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
    }
  }

  componentDidMount() {
    const postId = this.props.postId

    if (postId !== undefined) {
      this.setState(state => ({
        ...state,
        comment: {
          ...state.comment,
          parentId: postId
        }
      }))
    }
  }

  resetState() {
    this.setState(state => ({
      ...state,
      comment: {
        id: '',
        parentId: "",
        timestamp: '',
        body: '',
        author: 'George Harrison',
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      }
    }))
  }

  /**
  * @description Receives value from inputs and sets the state
  * of the view in order to manage the comment form
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
  * @description Handles the form submission of the comment form. After
  * submission, the function calls this.resetState to clear the form
  * @param {event} event - the form submit event
  */
  handleSubmit = (event) => {
    event.preventDefault()
    let commentToSubmit = this.state.comment

    commentToSubmit.id = createUniqueKey()
    commentToSubmit.timestamp = Date.now()
    this.props.createComment(commentToSubmit)

    this.resetState()
  }

  render() {
    let { comment } = this.state

    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='create-post-form'>
        <div className='create-post-details'>
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
            Add Comment
          </button>
        </div>
      </form>
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
    createComment: (comment) => dispatch(createComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm)