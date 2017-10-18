import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUniqueKey } from '../../utils/utils'

// Actions
import {
  createComment
} from '../../actions/comments'

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
    // upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    // downVotePost: (id) => dispatch(voteOnPost(id, 'downVote')),
    // fetchComments: (id) => dispatch(fetchCommentsForPost(id)),
    // upVoteComment: (id) => dispatch(voteOnComment(id, true)),
    // downVoteComment: (id) => dispatch(voteOnComment(id, false)),
    // deletePost: (id, history) => dispatch(deletePost(id, history))
    createComment: (comment) => dispatch(createComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm)