import { GET_ALL_CATEGORIES } from './types'

import * as API from '../utils/api'

const receiveAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

export const fetchCategories = () => (dispatch) => {
  API.fetchAllCategories().then(categories =>
    dispatch(receiveAllCategories(categories))
  )
}