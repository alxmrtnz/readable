import { combineReducers } from 'redux'

import { GET_ALL_CATEGORIES } from '../actions/categories'
import { GET_POSTS, UP_VOTE_POST, DOWN_VOTE_POST, SORT_POSTS } from '../actions/posts'

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
  const { posts, post } = action

  switch (action.type) {
    case GET_POSTS:
      let objectOfPosts =  posts.reduce((posts, post) => {
        posts[post.id] = post
        return posts
      }, {})

      return objectOfPosts
    case UP_VOTE_POST:
      // Increment vote score
      return {
        ...state,
        [post.id]: post
      }
    case DOWN_VOTE_POST:
      // Decrement vote score
      return {
        ...state,
        [post.id]: post
      }
    case SORT_POSTS:
      return posts
    default:
      return state
  }
}


export default combineReducers({
  categories,
  posts
})
