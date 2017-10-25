import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sortOrder from './sortOrder'
import comments from './comments'

export default combineReducers({
  categories,
  posts,
  comments,
  sortOrder
})
