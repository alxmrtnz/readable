import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import {
  voteOnPost,
  sortPosts
} from '../actions/posts'

// Components
import Post from './Post'

class PostList extends Component {

  render() {
    let { posts, sortOrder, category } = this.props;

    // Initially sort the posts to voteScore
    posts.sort(function(a, b) {
      if(sortOrder === 'voteScore') {
        return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      } else return posts
    });

    return (
      <div className="post-list-container">
        <div className='post-list'>
          {category &&
            <h2 className="category-heading"><span>Viewing posts tagged as: </span>{category}</h2>
          }
          {
            posts.filter((post) => {
              if (category) {
                return post.category === category
              }
              return post
            }).map( (post) =>
              <Post key={post.id} postObject={post} />
            )
          }

        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comments, sortOrder }) {
  return {
    posts,
    comments,
    sortOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(voteOnPost(id, true)),
    downVotePost: (id) => dispatch(voteOnPost(id, false)),
    sortPostList: (sortOption) => dispatch(sortPosts(sortOption))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
