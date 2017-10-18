import * as API from '../utils/api'

export const GET_POSTS = 'GET_POSTS';
// export const FETCH_POSTS = 'FETCH_POSTS';
// export const FETCH_POST = 'FETCH_POST';
// export const FETCH_POST_FOR_CATEGORY = 'FETCH_POST_FOR_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const DELETE_POST = 'DELETE_POST';


// Post Fetching
const receivePosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchPosts = () => dispatch => {
  API.fetchAllPosts().then(posts => {
      // Conduct initial sort by vote score
      posts.sort(function(a, b) {
        return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      });
      dispatch(receivePosts(posts))
    }
  )
}

// Create Post

const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const createPost = (post) => dispatch => {
  API.createPost(post).then((post) => {
    dispatch(addPost(post))
  })
}

// Update Post
const sendPostUpdate = (post) => ({
  type: UPDATE_POST,
  post
})

export const updatePost = (post) => dispatch => {
  API.updatePost(post).then((data) => {
    dispatch(sendPostUpdate(data))
  })
}

// Post Voting
export const voteOnPost = (id, isUp) => dispatch => {
  API.votePost(id, isUp).then((post) => {
    console.log('post voted: ', post)
    dispatch(recieveVoteOnPost(post))
  })
}

const recieveVoteOnPost = (post) => ({
  type: VOTE_ON_POST,
  post
})

// Post Sorting
export const sortPosts = (sortOption) => dispatch => {

    API.fetchAllPosts().then((posts) => {

      posts.sort(function(a, b) {
        if(sortOption === 'voteScore') {
          return parseFloat(b.voteScore) - parseFloat(a.voteScore);
        } else if (sortOption === 'timestamp') {
          return parseFloat(b.timestamp) - parseFloat(a.timestamp);
        } else return undefined
      });
      dispatch(receivePosts(posts))
    }
  )
}

export const getPostsByCategory = (category) => dispatch =>{
  API.fetchCategoryPosts(category).then(posts => {
    console.log('posts of category "', category, '": ', posts)
  })
}

// Delete Post
const deletePostSuccess = (postId) => ({
  type: DELETE_POST,
  postId
})


export function deletePost(postId, history) {
  return dispatch => {
    API.deletePost(postId).then( (data) =>{
      if (data.status === 200) {
        dispatch(deletePostSuccess(postId))
        if (history) {
          history.goBack()
        }
      }
    })
  }
}