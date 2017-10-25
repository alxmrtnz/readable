import {
    GET_POSTS,
    VOTE_ON_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST
} from '../actions/types'

export default function posts(state = [], action){
  const { posts, post, postId } = action
  let newState = ''
  let positionInArray = ''

  switch (action.type) {
    case GET_POSTS:
      return posts
    case ADD_POST:
      newState = [...state]
      newState.push(post)
      return newState
    case UPDATE_POST:
      positionInArray = state.map(function(item) {
        return item.id;
      }
      ).indexOf(post.id);

      newState = [
        ...state.slice( 0, positionInArray ),
        post,
        ...state.slice( positionInArray + 1, state.length)
      ]
      return newState
    case VOTE_ON_POST:
      positionInArray = state.map(function(item) {
        return item.id;
      }
      ).indexOf(post.id);

      newState = [
        ...state.slice( 0, positionInArray ),
        post,
        ...state.slice( positionInArray + 1, state.length)
      ]
      return newState
    case DELETE_POST:
      return state.filter(function(post) {
        return post.id !== postId;
      });
    default:
      return state
  }
}