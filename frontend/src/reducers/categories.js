import { GET_ALL_CATEGORIES } from '../actions/types'

export default function categories(state = {}, action){
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