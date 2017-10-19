import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"

// Actions
import { voteOnPost, deletePost } from '../actions/posts'
import { fetchCommentsForPost } from '../actions/comments'

// Components
import AddCommentForm from '../components/AddCommentForm/AddCommentForm'
import Comment from '../components/Comment/Comment'
import Nav from '../components/Nav/Nav'
import Post from '../components/Post/Post'

class PostView extends Component {

  state = {
    postLoaded: false,
    postComments: []
  }

  componentDidMount() {
    const postId = this.props.match.params.postId

    if (postId !== undefined) {
      this.props.fetchComments(postId)

    }
  }

  getCurPost() {
    let { posts } = this.props
    const postId = this.props.match.params.postId

    if (postId !== undefined) {
      let positionInArray = posts.map(function(item) {
        return item.id;
      }
      ).indexOf(postId);

      return posts[positionInArray]
    }
  }

  renderPost() {
    let post = this.getCurPost()
    let { history } = this.props

    if (post !== undefined) {
      return (
        <Post
          key={post.id}
          postObject={post}
          history={history}
          postView={true}
        />
      )
    }
  }

  getCommentsForThisPost() {
    let post = this.getCurPost()
    let { comments } = this.props

    if (post !== undefined) {
      var reducedComments = comments.reduce(function(filtered, comment) {
        if (comment.parentId === post.id) {
           filtered.push(comment);
        }
        return filtered;
      }, []);

      return reducedComments
    }
  }

  render() {
    let { comments } = this.props
    let postComments = this.getCommentsForThisPost()

    console.log('post comments: ', postComments)

    return (
      <div className="post-view">
        <Nav />
        <Helmet>
            <title>Udacilist | Post Title?</title>
        </Helmet>
        <div className="wrap">
          { this.renderPost() }
          <AddCommentForm
            postId={this.props.match.params.postId}
          />
          <div className="post-comments">
            {postComments && postComments.map((comment) => (
              <Comment key={comment.id} commentObject={comment}/>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories,
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, true)),
    downVotePost: (id) => dispatch(voteOnPost(id, false)),
    fetchComments: (id) => dispatch(fetchCommentsForPost(id)),
    deletePost: (id, history) => dispatch(deletePost(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)