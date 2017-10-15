import * as API from '../utils/api'

export const GET_POSTS = 'GET_POSTS';
// export const FETCH_POSTS = 'FETCH_POSTS';
// export const FETCH_POST = 'FETCH_POST';
// export const FETCH_POST_FOR_CATEGORY = 'FETCH_POST_FOR_CATEGORY';
export const ADD_POST = 'ADD_POST';
// export const UPDATE_POST = 'UPDATE_POST';
// export const VOTE_ON_POST = 'VOTE_ON_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const SORT_POSTS = 'SORT_POSTS';
// export const DELETE_POST = 'DELETE_POST';

// Utility Functions
function sortBy(field, reverse, primer){

  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a), b = key(b), reverse * ((a > b) - (b > a)));
  }
}

function sortPostsFromArrayToObject(posts, sortOption) {
  let postsArray = Object.keys(posts).map(function(key) {
    return posts[key];
  });

  let sortedPosts = postsArray.sort(sortBy(sortOption, true, parseInt))

  let objectOfSortedPosts =  sortedPosts.reduce((posts, post) => {
    posts[post.id] = post
    return posts
  }, {})

  return objectOfSortedPosts;
}
//////////////////////////


// Post Fetching
const receiveAllPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchPosts = () => dispatch => {
  API.fetchAllPosts().then(posts => {
      let objectOfSortedPosts = sortPostsFromArrayToObject(posts, 'voteScore');
      dispatch(receiveAllPosts(objectOfSortedPosts))
    }
  )
}

// Create Post

const addPost = post => ({
  type: ADD_POST,
  post
})

export const createPost = (post) => dispatch => {
  API.createPost(post).then((data) => {
    console.log('create post data: ', data)
    dispatch(addPost(data))
    // histroy.goBack()
  })
}

// Post Voting
export const voteOnPost = (id, type) => dispatch => {
    API.fetchPostDetail(id).then((post) => {
      if (type === 'upVote') {
        post.voteScore += 1

        API.updatePost(post).then((post) => {
          dispatch(sendUpVote(post))
        })
      } else if (type === 'downVote') {
        post.voteScore -= 1

        API.updatePost(post).then((post) => {
          dispatch(sendDownVote(post))
        })
      }
    }
  )
}

const sendUpVote = (post) => ({
  type: UP_VOTE_POST,
  post
})

const sendDownVote = (post) => ({
  type: DOWN_VOTE_POST,
  post
})

// Post Sorting
export const sortPosts = (sortOption) => dispatch => {

    API.fetchAllPosts().then(posts => {
      let objectOfSortedPosts = sortPostsFromArrayToObject(posts, sortOption);

      dispatch(receiveAllPosts(objectOfSortedPosts))
    }
  )
}

export const getPostsByCategory = (category) => dispatch =>{
  API.fetchCategoryPosts(category).then(posts => {
    console.log('posts of category "', category, '": ', posts)
  })
}