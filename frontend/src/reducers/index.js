import { combineReducers } from 'redux'

import { GET_ALL_CATEGORIES } from '../actions/categories'
import { GET_POSTS } from '../actions/posts'

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
  switch (action.type) {
    case GET_POSTS:
      return action.posts
      // return action.posts.reduce((posts, post) => {
      //   posts[post.id] = post.title
      //   return posts
      // }, {})
    default:
      return state
  }
}


export default combineReducers({
  categories,
  posts
})
