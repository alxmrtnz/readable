import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Select from 'react-select';
import { createUniqueKey } from '../utils/utils'

// React Select Default Styles
import 'react-select/dist/react-select.css';

// Components
import Nav from '../components/Nav/Nav'

// Actions
import {
  createPost,
} from '../actions/posts'

class AddPostView extends Component {

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

  convertCategoriesObjectToArray(categories) {
    var newArray = [];

    function assignElementToNewObject(element, index, array) {
      var objectElement = element.split(',');
      newObject.value = objectElement[0];
      newObject.label = objectElement[0];
    }

    for (var category in categories) {
      var categoryName = category;
      var thisObjectAsArray = categoryName.split(':');
      var newObject = {
        'value': '',
        'label': ''
      };

      thisObjectAsArray.forEach(assignElementToNewObject);

      newArray.push(newObject);
    }
    return newArray;
  }

  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      post: {
        ...state.post,
        ...newPartialInput,
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let postToSubmit = this.state.post;

    postToSubmit.id = createUniqueKey()
    postToSubmit.timestamp = Date.now()

    this.props.createPost(postToSubmit)
    this.props.history.goBack()
  }

  render() {
    const { categories } = this.props
    let { post } = this.state
    let selectOptions = this.convertCategoriesObjectToArray(categories)

    return (
      <div className="add-post">
        <Nav />
        <Helmet>
            <title>Udacilist | Add Post</title>
        </Helmet>
        <div className="wrap">
          <form onSubmit={(event) => this.handleSubmit(event)} className='create-post-form'>
            <div className='create-post-details'>
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={event => this.handleInputChange({title: event.target.value})}
              />
              <input
                name="author"
                type="text"
                placeholder="Author"
                value={post.author}
                onChange={event => this.handleInputChange({author: event.target.value})}
              />
              <textarea
                name="body"
                type="text"
                placeholder="Body"
                value={post.body}
                onChange={event => this.handleInputChange({body: event.target.value})}
              />
              <Select
                name="form-field-name"
                value={post.category}
                placeholder="Select a category..."
                resetValue=""
                options={selectOptions}
                onChange={event => this.handleInputChange({category: event.value})}
              />
              <button
                className="cta"
                onClick={(event) => this.handleSubmit(event)}
              >
                Add Post
              </button>
            </div>
          </form>
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
    createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostView)