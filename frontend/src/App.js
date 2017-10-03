import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as API from './utils/api'

import { createComment } from './utils/api'

// Actions
import { fetchCategories } from './actions/categories'

// Assets
import './assets/styles/styles.css'

// Components
import HeadMeta from './components/HeadMeta/HeadMeta'

// Screens
import Landing from './screens/Landing'

class App extends Component {

  render() {
    return (
      <div className="App">
        <HeadMeta />
        <Route exact path="/" render={() => (
          <Landing />
        )}/>
        <Route path="/category" render={() => (
          <div>category view</div>
        )} />
        <Route path="/post-detail" render={() => (
          <div>post-detail view</div>
        )} />
        <Route path="/create-edit" render={() => (
          <div>create/edit view</div>
        )} />
      </div>
    );
  }
}

export default App;