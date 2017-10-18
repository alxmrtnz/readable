import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'

// Utilities
import { getNumberOfDaysFromDate } from '../utils/utils'

// Actions
import { voteOnPost, deletePost } from '../actions/posts'
import { fetchCommentsForPost, voteOnComment } from '../actions/comments'

// Components
import Nav from '../components/Nav/Nav'
import Icon from '../components/Icon/Icon'
import AddCommentForm from '../components/AddCommentForm/AddCommentForm'

class PostView extends Component {

  state = {
    postLoaded: false
  }

  componentDidMount() {
    const postId = this.props.match.params.postId

    if (postId !== undefined) {
      console.log('got post id')
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
        <div key={post.id} className="post">
          <div className="post-vote-container">
            <div className="post-vote">
              <div
                className="post-vote-up"
                onClick={() => this.props.upVotePost(post.id)}
              >
                <Icon type="triangle-up" />
              </div>
              <div className="post-vote-score">
                {post.voteScore}
              </div>
              <div
                className="post-vote-down"
                onClick={() => this.props.downVotePost(post.id)}
              >
                <Icon type="triangle-down" />
              </div>
            </div>
          </div>
          <div className="post-info">
            <div className="post-title" >
              {post.title}
            </div>
            <div className="post-meta">
              <div className="post-submission-info">
                Submitted {getNumberOfDaysFromDate(post.timestamp)} days ago by
                <span className="post-author">
                  {post.author}
                </span>
              </div>
            </div>
            <div className="post-body">
              {post.body}
            </div>
            <div className="post-meta">
              <div className="post-category">
                Category:
                <span className="post-category-pill">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="post-actions">
              <Link to={`/post/${post.id}/edit`}>
                Edit Post
              </Link>
              <a
                onClick={() => this.props.deletePost(post.id, history)}
              >
                Delete Post
              </a>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    let { comments } = this.props
    // let { postLoaded } = this.state
    // console.log('comments on the post: ', comments)
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
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-meta">
                  {comment.author}  |  {comment.timestamp}
                </div>
                <div className="comment-body">
                  {comment.body}
                </div>
                <div className="comment-actions">
                  <div className="comment-vote-container">
                    <div className="comment-voter-arrows">
                      <div
                        className="comment-voter up"
                        onClick={() => this.props.upVoteComment(comment.id)}
                      />
                      <div
                        className="comment-voter down"
                        onClick={() => this.props.downVoteComment(comment.id)}
                      />
                    </div>
                    {comment.voteScore} points
                  </div>
                </div>
              </div>
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
    upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    downVotePost: (id) => dispatch(voteOnPost(id, 'downVote')),
    fetchComments: (id) => dispatch(fetchCommentsForPost(id)),
    upVoteComment: (id) => dispatch(voteOnComment(id, true)),
    downVoteComment: (id) => dispatch(voteOnComment(id, false)),
    deletePost: (id, history) => dispatch(deletePost(id, history))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)