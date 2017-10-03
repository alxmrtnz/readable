import * as API from '../utils/api'

export const GET_POSTS = 'GET_POSTS';
// export const FETCH_POSTS = 'FETCH_POSTS';
// export const FETCH_POST = 'FETCH_POST';
// export const FETCH_POST_FOR_CATEGORY = 'FETCH_POST_FOR_CATEGORY';
// export const ADD_POST = 'ADD_POST';
// export const UPDATE_POST = 'UPDATE_POST';
// export const VOTE_ON_POST = 'VOTE_ON_POST';
// export const UP_VOTE_POST = 'UP_VOTE_POST';
// export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
// export const DELETE_POST = 'DELETE_POST';


const receiveAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchPosts = () => dispatch => {
  API
    .fetchAllPosts()
    .then(posts =>
      dispatch(receiveAllPosts(posts))
    )
}