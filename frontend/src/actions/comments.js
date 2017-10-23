import * as API from '../utils/api'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Comment Addition
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const createComment = (comment) => (dispatch) => {
  API.createComment(comment).then(comment => {
      dispatch(addComment(comment))
    }
  )
}

// Comment Fetching
const receiveCommentsForPost = (comments) => ({
  type: GET_POST_COMMENTS,
  comments
});


export function fetchCommentsForPost(id) {
  return dispatch => {
    return API.fetchComments(id).then(comments => {
        dispatch(receiveCommentsForPost(comments))
      }
    )
  }
}

// Comment Voting
const receiveCommentVote = (comment) => ({
  type: VOTE_ON_COMMENT,
  comment
});

export const voteOnComment = (id, isUp) => dispatch => {
  API.voteComment(id, isUp).then((comment) => {
    dispatch(receiveCommentVote(comment))
  })
}

// Comment Updating
const receiveUpdatedComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

export const updateComment = (commentId, timestamp, detail) => dispatch => {
  API.updateComment(commentId, timestamp, detail).then((comment) => {
    dispatch(receiveUpdatedComment(comment))
  })
}

// Comment Deletion
const deleteCommentSuccess = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})

export function deleteComment(commentId) {
  return dispatch => {
    API.deleteComment(commentId).then( (data) =>{
      if (data.status === 200) {
        dispatch(deleteCommentSuccess(commentId))
      }
    })
  }
}
