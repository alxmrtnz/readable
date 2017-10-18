import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddCommentForm extends Component {
  state = {
    postId: '',
    comment: ''
  }

  componentDidMount() {
    const postId = this.props.postId

    if (postId !== undefined) {
      this.setState(state => ({
        ...state,
        postId: postId,
      }))
    }
  }

  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      comment: newPartialInput
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    console.log(this.state.postId)
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
            value={comment}
            onChange={event => this.handleInputChange( event.target.value)}
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

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm)