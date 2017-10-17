import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Assets
import './assets/styles/styles.css'

// Components
import SVGSprite from './components/SVGSprite/SVGSprite'
import HeadMeta from './components/HeadMeta/HeadMeta'

// Actions
import { fetchCategories } from './actions/categories'
import { fetchPosts } from './actions/posts'

// Screens
import Landing from './screens/Landing'
import CategoryView from './screens/CategoryView'
import AddEditPostView from './screens/AddEditPostView'
import PostView from './screens/PostView'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchAllPosts()
  }

  render() {
    return (
      <div className="App">
        <HeadMeta />
        <SVGSprite />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
              <Landing />
            )}/>
            <Route exact path={'/:category'} render={(props) => (
              <CategoryView {...props} />
            )} />
            <Route path="/post/add" render={(props) => (
              <AddEditPostView {...props} />
            )} />
            <Route exact path="/post/:postId" render={(props) => (
              <PostView {...props} />
            )} />
            <Route exact path="/post/:postId/edit" render={(props) => (
              <AddEditPostView {...props} />
            )} />
            <Route path="/create-edit" render={() => (
              <div>create/edit view</div>
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchAllPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)