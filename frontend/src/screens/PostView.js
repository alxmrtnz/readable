import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'

// Utilities
import { getNumberOfDaysFromDate } from '../utils/utils'

// Actions
import {
  voteOnPost
} from '../actions/posts'

// Components
import Nav from '../components/Nav/Nav'
import Icon from '../components/Icon/Icon'

class PostView extends Component {

  state = {
    post: {
      id: "",
      timestamp: "",
      title: "",
      body: "",
      author: "",
      category: "",
      voteScore: "0",
      deleted: false
    }
  }

  getCurPost() {
    let { posts } = this.props
    const postId = this.props.match.params.postId

    if (postId !== undefined) {
      return posts[postId]
    }
  }

  renderPost() {
    let post = this.getCurPost()

    if (post !== undefined ) {

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
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    // const { categories } = this.props
    // let { post } = this.state

    return (
      <div className="view-post">
        <Nav />
        <Helmet>
            <title>Udacilist | Post Title?</title>
        </Helmet>
        <div className="wrap">
          { this.renderPost() }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    downVotePost: (id) => dispatch(voteOnPost(id, 'downVote')),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)