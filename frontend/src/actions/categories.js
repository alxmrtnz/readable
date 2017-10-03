import * as API from '../utils/api'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

const receiveAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => {
  API
    .fetchAllCategories()
    .then(categories =>
      dispatch(receiveAllCategories(categories))
    )
}


// The same as:
// function receiveAllCategories(categories) {
//   return {
//     type: GET_ALL_CATEGORIES,
//     categories
//   }
// };

// export function fetchCategories() {
//   return dispatch => {
//     return API
//     .fetchAllCategories()
//     .then(categories =>
//       dispatch(receiveAllCategories(categories))
//     )
//   }
// }