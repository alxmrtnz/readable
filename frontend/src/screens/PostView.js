import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"

// Components
import Nav from '../components/Nav/Nav'

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
    // const postId = this.props.match.params.postId
    // if (postId !== undefined) {
    //   const newPosts = this.props.posts.filter((post) => {
    //     return post.id === postId
    //   })
    //   if (newPosts.length > 0) {
    //     return newPosts[0]
    //   }
    // }
    // return undefined
  }

  render() {
    const { categories } = this.props
    let { post } = this.state

    return (
      <div className="view-post">
        <Nav />
        <Helmet>
            <title>Udacilist | Post Title?</title>
        </Helmet>
        <div className="wrap">
          This is the Post View
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
    // createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)