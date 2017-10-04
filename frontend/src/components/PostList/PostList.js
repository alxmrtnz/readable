import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown';

// Actions
import { fetchPosts } from '../../actions/posts'

// Components
import Icon from '../Icon/Icon'

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  getNumberOfDaysFrom(datePast) {

    // //Get 1 day in milliseconds
    let oneDay=1000*60*60*24;
    let dateToday = Date.now();

    // // Calculate the difference in milliseconds
    let differenceInMS = dateToday - datePast;
    return Math.round(differenceInMS/oneDay);
  }

  sortBy(field, reverse, primer){

     var key = primer ?
         function(x) {return primer(x[field])} :
         function(x) {return x[field]};

     reverse = !reverse ? 1 : -1;

     return function (a, b) {
         return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
       }
  }


  render() {
    let { posts } = this.props

    posts.sort(this.sortBy('voteScore', false, parseInt));

    const dropdownOptions = [
      'Popularity',
      'Most Recent',
    ]

    return (
      <div className="post-list-container">
        <div className="post-list-header">
          <h2 className="post-list-header-heading">
            Top Posts
          </h2>
          <div className="dropdown-container">
            <div className="dropdown-label">
              Sorted by
            </div>
            <Dropdown
              className="dropdown-button "
              options={dropdownOptions}
              // onChange={data => this.handleInputChange({creditCardExpirationMonth: data.value})}
              value={dropdownOptions[0]}
              placeholder="Select an option"
            />
          </div>
        </div>
        <ul className='post-list'>
          {posts.map( (post) =>
            <li key={post.id} className="post">
              <div className="post-vote">
                <div className="post-vote-up">
                  <Icon type="triangle-up" />
                </div>
                <div className="post-vote-score">
                  {post.voteScore}
                </div>
                <div className="post-vote-down">
                  <Icon type="triangle-down" />
                </div>
              </div>
              <div className="post-info">
                <a href="" className="post-title">
                  {post.title}
                </a>
                <div className="post-meta">
                  <div className="post-submission-info">
                    Submitted {this.getNumberOfDaysFrom(post.timestamp)} days ago by
                    <span className="post-author">
                      {post.author}
                    </span>
                  </div>
                  <div className="post-category">
                    Category:
                    <span className="post-category-pill">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
