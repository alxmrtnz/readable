import {
  GET_POST_COMMENTS,
  VOTE_ON_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions/types'

export default function comments(state = [], action){
  const { comments, comment, commentId } = action
  let newState = ''
  let commentPosition = ''

  switch (action.type) {
    case GET_POST_COMMENTS:
      let previousComments = [...state]

      let previousCommentIds = previousComments.map((comment) => comment.id)

      let newComments = comments.filter(function(comment) {
        return !previousCommentIds.includes(comment.id)
      });

      newState = previousComments.concat(newComments)
      return newState
    case VOTE_ON_COMMENT:
      commentPosition = state.map(function(item) {
        return item.id;
      }
      ).indexOf(comment.id);

      newState = [
        ...state.slice( 0, commentPosition ),
        comment,
        ...state.slice( commentPosition + 1, state.length)
      ]

      newState.sort(function(a, b) {
          return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      });
      return newState
    case ADD_COMMENT:
      newState = [...state]
      newState.push(comment)
      return newState
    case UPDATE_COMMENT:
      commentPosition = state.map(function(item) {
        return item.id;
      }
      ).indexOf(comment.id);

      newState = [
        ...state.slice( 0, commentPosition ),
        comment,
        ...state.slice( commentPosition + 1, state.length)
      ]
      return newState
    case DELETE_COMMENT:
      return state.filter(function(comment) {
        return comment.id !== commentId;
      });
    default:
      return state
  }
}