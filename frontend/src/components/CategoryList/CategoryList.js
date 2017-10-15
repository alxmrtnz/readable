import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class CategoryList extends Component {

  componentDidMount() {
    console.log('category list mounted')
  }

  render() {
    let { categories } = this.props;

    console.log('Categories: ', categories)

    return (
      <div className="category-list">
        <p>Categories</p>
        <ul className='category-list'>
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

function mapDispatchToProps (dispatch) {
  return {
    // fetchCategories: () => dispatch(fetchCategories()),
    // remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)