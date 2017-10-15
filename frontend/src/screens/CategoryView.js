import React, { Component } from 'react'
import { Helmet } from "react-helmet"
import { connect } from 'react-redux'

// import PostList from '../components/PostList/PostList'
import CategoryList from '../components/CategoryList/CategoryList'
import Nav from '../components/Nav/Nav'
import PostFilter from '../components/PostFilter/PostFilter'

class CategoryView extends Component {
  componentWillMount() {
      if (this.props.match.params.category) {
        // this.props.fetchCategoryPosts(this.props.match.params.category);
        console.log("there's a new category!")
      } else {
        // this.props.fetchPosts();
      }
    }

  render() {
    const currentCategory = this.props.match.params.category
    console.log('CURRENT CATEGORY: ', currentCategory)

    return (
      <div className="category-view">
        <Helmet>
            <title>Udacilist | Welcome!</title>
        </Helmet>
        <Nav />
        <PostFilter />
        <div className="wrap">
          <div className="landing-canvas">
            <div className="landing-canvas-content">
              category view
            </div>
            <div className="landing-canvas-sidebar">
              <CategoryList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
  }
}
export default connect(mapStateToProps)(CategoryView);
