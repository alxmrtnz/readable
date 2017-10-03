import React, { Component } from 'react';
import { connect } from 'react-redux'

// Actions
import { fetchCategories } from '../../actions/categories'

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    // this.props.getAllPosts()
  }

  render() {
    let { categories } = this.props;

    return (
      <div className="category-list">
        <p>Categories</p>
        <ul className='category-list'>
          {Object.keys(categories).map((name) => (
            <li key={name} >
              {categories[name]}
            </li>
          ))}
        </ul>
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
    // remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)