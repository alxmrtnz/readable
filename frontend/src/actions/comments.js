// export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';
// export const FETCH_COMMENT = 'FETCH_COMMENT';
export const POST_COMMENT = 'POST_COMMENT';
// export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
// export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
// export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
// export const UPDATE_COMMENT = 'UPDATE_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';


    let newComment = {
    id: '123',
    parentId: "1",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  }

  createComment(newComment).then(data =>
    console.log(data),
  )
  export function addComment(comment) {
    return {
      type: POST_COMMENT,
      comment
    }
  }