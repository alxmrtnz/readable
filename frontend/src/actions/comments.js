import * as API from '../utils/api'

// export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
// export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
// export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
// export const UPDATE_COMMENT = 'UPDATE_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';


  export function addComment(comment) {
    return {
      type: ADD_COMMENT,
      comment
    }
  }

  // Adding a Comment
  export const createComment = (comment) => (dispatch) => {
    API.createComment(comment).then(comment => {
        console.log('new comments: ', comment)
        dispatch(addComment(comment))
      }
    )
  }

  // Comment Fetching
  const receiveCommentsForPost = (comments) => ({
    type: GET_POST_COMMENTS,
    comments
  });

  export const fetchCommentsForPost = (id) => dispatch => {
    API.fetchComments(id).then(comments => {
        dispatch(receiveCommentsForPost(comments))
      }
    )
  }

  const receiveCommentVote = (comment) => ({
    type: VOTE_ON_COMMENT,
    comment
  });

  export const voteOnComment = (id, isUp) => dispatch => {
    API.voteComment(id, isUp).then((comment) => {
      dispatch(receiveCommentVote(comment))
    })
  }