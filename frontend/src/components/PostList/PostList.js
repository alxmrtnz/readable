import React, { Component } from 'react';
import { connect } from 'react-redux'

// Actions
import { fetchPosts } from '../../actions/posts'

class PostList extends Component {
  componentDidMount() {
    // this.props.fetchCategories()
    this.props.fetchPosts()
  }
  render() {
    let { posts } = this.props
    // console.log('POSTS: ', posts)

    return (
      <div className="post-list">
        <p>Posts</p>
        <ul className='post-list'>
          {posts.map( (post) =>
            <li key={post.id} >
              {post.title}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
