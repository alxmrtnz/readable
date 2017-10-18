import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUniqueKey } from '../../utils/utils'

// Utilities
import { getNumberOfDaysFromDate } from '../../utils/utils'

// Actions
import {
  createComment,
  voteOnComment
} from '../../actions/comments'

class Comment extends Component {
  state = {
    // comment: {
    //   id: '',
    //   parentId: "",
    //   timestamp: '',
    //   body: '',
    //   author: 'George Harrison',
    //   voteScore: 1,
    //   deleted: false,
    //   parentDeleted: false
    // }
  }

  componentDidMount() {

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

  }

  handleEditPost = (event) => {
    console.log(' edit clicked')
  }

  handleDeletePost = (event) => {
    console.log(' delete clicked')
  }

  render() {
    let { commentObject } = this.props

    return (
      <div className="comment">
        <div className="comment-meta">
          {commentObject.author}  |  {getNumberOfDaysFromDate(commentObject.timestamp)} days ago
        </div>
        <div className="comment-body">
          {commentObject.body}
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
          <div className="comment-edit-delete">
            <a
              onClick={(event) => this.handleEditPost(event)}
            >
              Edit
            </a>
            <a
              onClick={(event) => this.handleDeletePost(event)}
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
    createComment: (comment) => dispatch(createComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)