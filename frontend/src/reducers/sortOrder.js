import { UPDATE_SORT_ORDER } from '../actions/types'

export default function sortOrder(state = 'voteScore', action){
  let { option } = action

  switch (action.type) {
    case UPDATE_SORT_ORDER:
      return option
    default:
      return state
  }
}