import React, { Component } from 'react'
import Select from 'react-select';
import { connect } from 'react-redux'
import { createUniqueKey } from '../utils/utils'
import { Helmet } from "react-helmet"

// React Select Default Styles
import 'react-select/dist/react-select.css';

// Components
import Nav from '../components/Nav/Nav'

// Actions
import {
  createPost,
  updatePost
} from '../actions/posts'

class AddEditPostView extends Component {

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
    },
    updatingPost: false
  }

  componentDidMount() {
    let { posts } = this.props
    this.setExisitingPost(posts)
  }

  componentWillReceiveProps = (nextProps) => {
    let { posts } = nextProps
    this.setExisitingPost(posts)
  }

  /**
  * @description Function to set the view's 'post' state.
  * This function is called when the AddEditPostView mounts or
  * receives props because postId is determined from
  * this.props.match.params.postId and may not available on initial mount
  * @param {Array} posts - The posts as a prop via Redux state
  */
  setExisitingPost = (posts) => {
    const postId = this.props.match.params.postId

    if (postId !== undefined) {
      let positionInArray = posts.map(function(item) {
        return item.id;
      }
      ).indexOf(postId);

      if (posts[positionInArray] !== undefined) {
        this.setState(state => ({
          ...state,
          post: posts[positionInArray],
          updatingPost: true
        }))
      }
    }
  }

  /**
  * @description Function to convert an object to an array. Categories
  * are stored as an object, however the `Select` component requires
  * options as an array.
  * @param {Object} categories - The posts as a prop via Redux state
  * @returns {Array} the initial categories object now as an array
  */
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

  /**
  * @description Receives value from inputs and sets the state of the view
  * in order to manage the edit form
  * @param {Object} newPartialInput - event.target.value of an input
  */
  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      post: {
        ...state.post,
        ...newPartialInput,
      }
    }))
  }

  /**
  * @description Handles the form submission of the Add/Edit view. The function
  * checks whether the view is "editing" an existing post or "creating/adding"
  * a new post (based on this.state.updatingPost) and then either calls
  * prop functions to update or create a post
  * @param {event} event - the form submit event
  */
  handleSubmit = (event) => {
    event.preventDefault()

    let postToSubmit = this.state.post

    if (this.state.updatingPost) {
      this.props.updatePost(postToSubmit)
    } else {
      postToSubmit.id = createUniqueKey()
      postToSubmit.timestamp = Date.now()
      this.props.createPost(postToSubmit)
    }
    this.props.history.goBack()
  }

  render() {
    const { categories } = this.props
    let { post, updatingPost } = this.state
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
                {updatingPost ? 'Save Changes' : 'Add Post'}
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
    createPost: (post) => dispatch(createPost(post)),
    updatePost: (post) => dispatch(updatePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditPostView)