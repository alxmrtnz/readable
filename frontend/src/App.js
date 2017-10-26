import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Assets
import './assets/styles/styles.css'

// Components
import SVGSprite from './components/SVGSprite'
import HeadMeta from './components/HeadMeta'

// Actions
import { fetchCategories } from './actions/categories'
import { fetchPostsAndComments } from './actions/posts'

// Screens
import Main from './screens/Main'
import AddEditPostView from './screens/AddEditPostView'
import PostView from './screens/PostView'
import PageNotFound from './screens/PageNotFound'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPostsAndComments()
  }

  render() {
    return (
      <div className="App">
        <HeadMeta />
        <SVGSprite />
        <BrowserRouter>
          <Switch>
            <Route path="/404" render={() => (
              <PageNotFound />
            )} />
            <Route exact path="/" render={(props) => (
              <Main {...props}/>
            )}/>
            <Route exact path={'/:category'} render={(props) => (
              <Main {...props} />
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
    fetchPostsAndComments: () => dispatch(fetchPostsAndComments()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)