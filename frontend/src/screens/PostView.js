import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"
import { Redirect } from 'react-router-dom'

// Actions
import { voteOnPost, deletePost } from '../actions/posts'

// Components
import AddCommentForm from '../components/AddCommentForm'
import Comment from '../components/Comment'
import Nav from '../components/Nav'
import Post from '../components/Post'

class PostView extends Component {

  state = {
    postLoaded: false,
    postComments: [],
    isLoading: true,
    post: {},
    redirect: false
  }

  componentWillMount() {
    let { posts } = this.props
    this.getCurrentPost(posts)
  }

  onComponentDidMount() {
    let { posts } = this.props
    this.getCurrentPost(posts)
  }

  componentWillReceiveProps = (nextProps) => {
    let { posts } = nextProps
    this.getCurrentPost(posts)
  }

  /**
  * @description Gets the current post from the Redux store based on
  * the postId provided in this.props.match.params.postId
  * @returns {Object} post - a single post object from the store
  */
  getCurrentPost(posts) {
    const postId = this.props.match.params.postId

    if ((postId !== undefined) && (posts.length > 0)) {
      let positionInArray = posts.map(function(item) {
        return item.id;
      }
      ).indexOf(postId);

      if (positionInArray >= 0) {
        this.setState(state => ({
          ...state,
          post: posts[positionInArray],
          isLoading: false
        }))
      } else {
        this.setState(state => ({
          ...state,
          redirect: true
        }))
      }
    }
  }

  /**
  * @description Function to render a Post component. This function first
  * calls this.getCurrentPost() to get a post object and waits to return
  * a `Post` component until the post exists (as it is dependent on matching
  * url params before being able to return a post)
  * @param {Object} post - object for post currently being viewed, as stored in
  * redux store
  * @param {Object} history - history object prop from BrowserRouter
  * @returns {Component} Post - a post component with props being passed into it
  */
  // renderPost() {
  //   let post = this.getCurrentPost()
  //   let { history } = this.props

  //   if (post !== undefined) {
  //     return (
  //       <Post
  //         key={post.id}
  //         postObject={post}
  //         history={history}
  //         postView={true}
  //       />
  //     )
  //   }
  // }

  /**
  * @description Function that accesses all comments in the redux store, then reduces
  * those comments to an array of only the comments for the current post being viewed.
  * This function then returns those comments as a new array
  * @param {Object} post - object for post currently being viewed, as stored in
  * redux store
  * @param {Array} comments - array of comments as stored in redux store
  * @returns {Array} reducedComments - a filtered array of comments for the current post
  */
  getCommentsForPost() {
    let { post } = this.state
    let { comments } = this.props

    let filteredComments = comments.filter(function(comment) {
      return comment.parentId === post.id;
    });

    return filteredComments
  }

  render() {
    let postComments = this.getCommentsForPost()
    let { post, redirect } = this.state
    let { history } = this.props

    return (
      <div className="post-view">
        <Nav />
        <Helmet>
            <title>Udacilist | Post Title?</title>
        </Helmet>
        {redirect &&
          <Redirect to="/404" push />
        }
        {post &&
          <div className="wrap">
            <Post
              key={post.id}
              postObject={post}
              history={history}
              postView={true}
            />
          <AddCommentForm
            postId={this.props.match.params.postId}
          />
          <div className="post-comments">
            {postComments && postComments.map((comment) => (
              <Comment key={comment.id} commentObject={comment}/>
            ))}
          </div>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ categories, comments, posts }) {
  return {
    categories,
    comments,
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, true)),
    downVotePost: (id) => dispatch(voteOnPost(id, false)),
    deletePost: (id, history) => dispatch(deletePost(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)