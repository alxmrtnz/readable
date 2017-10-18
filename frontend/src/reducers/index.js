import { combineReducers } from 'redux'

import {
    GET_POSTS,
    VOTE_ON_POST,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST
} from '../actions/posts'

import { GET_ALL_CATEGORIES } from '../actions/categories'

import {
  GET_POST_COMMENTS,
  VOTE_ON_COMMENT,
  ADD_COMMENT
} from '../actions/comments'

import { UPDATE_SORT_ORDER } from '../actions/sort'

export function categories(state = {}, action){
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories.reduce((categories, category) => {
        categories[category.name] = category.path
        return categories
      }, {})
    default:
      return state
  }
}

export function posts(state = [], action){
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

export function comments(state = [], action){
  const { comments, comment } = action
  let newState = ''

  switch (action.type) {
    case GET_POST_COMMENTS:
      newState = comments
      newState.sort(function(a, b) {
          return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      });
      return newState
    case VOTE_ON_COMMENT:
      let commentPosition = state.map(function(item) {
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
    default:
      return state
  }
}


export function sortOrder(state = 'voteScore', action){
  let { option } = action

  switch (action.type) {
    case UPDATE_SORT_ORDER:
      return option
    default:
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  comments,
  sortOrder
})
