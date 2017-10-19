import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class CategoryList extends Component {

  render() {
    let { categories } = this.props;

    return (
      <div className="category-list">
        <p>Categories</p>
        <ul className='category-list'>
          <li key='all' >
            <Link to="/">
              All Categories
            </Link>
          </li>
          {Object.keys(categories).map((name) => (
            <li key={name} >
              <Link to={`/${categories[name]}`} >
                {categories[name]}
              </Link>
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

export default connect(
  mapStateToProps
)(CategoryList)