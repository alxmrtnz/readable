const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'whatever-you-want'
}

// ---- category api ----

export const fetchAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(data => data.categories)

export const fetchCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

// ---- post api ----

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const createPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())


export const fetchPostDetail = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)


export const votePost = (postId, isUp) => {
  const body = {option: isUp ? 'upVote':'downVote'}
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}


export const updatePost = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
}


export const deletePost = (postId) =>{
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers
  })
}

// ---- comment api ----
export const fetchComments = (postId) =>{
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
}
/** body
 * id: Any unique ID. As with posts, UUID is probably the best here.
 * timestamp: timestamp. Get this however you want.
 * body: String
 * owner: String
 * parentId: Should match a post id in the database.
**/
export const createComment = (body) =>{
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const fetchCommentDetail = (commentId) =>{
  return fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const updateComment = (commentId, timestamp, detail) =>{
  const requestBody = {'timestamp' : timestamp, 'body' : detail}
  return fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then(res => res.json())
}

export const voteComment = (commentId, isUp) =>{
  const body = {option: isUp ? 'upVote':'downVote'}
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const deleteComment = (commentId) =>{
  return fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  })
}