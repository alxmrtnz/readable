import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown';

// Actions
import { fetchPosts, voteOnPost } from '../../actions/posts'


// Components
import Icon from '../Icon/Icon'

class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts()
  }

  getNumberOfDaysFromDate(datePast) {
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
          {Object.keys(posts).map( (post) =>
            <li key={posts[post].id} className="post">
              <div className="post-vote">
                <div
                  className="post-vote-up"
                  onClick={() => this.props.upVotePost(posts[post].id)}
                >
                  <Icon type="triangle-up" />
                </div>
                <div className="post-vote-score">
                  {posts[post].voteScore}
                </div>
                <div
                  className="post-vote-down"
                  onClick={() => this.props.downVotePost(posts[post].id)}
                >
                  <Icon type="triangle-down" />
                </div>
              </div>
              <div className="post-info">
                <a href="" className="post-title">
                  {posts[post].title}
                </a>
                <div className="post-meta">
                  <div className="post-submission-info">
                    Submitted {this.getNumberOfDaysFromDate(posts[post].timestamp)} days ago by
                    <span className="post-author">
                      {posts[post].author}
                    </span>
                  </div>
                  <div className="post-category">
                    Category:
                    <span className="post-category-pill">
                      {posts[post].category}
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
    fetchAllPosts: () => dispatch(fetchPosts()),
    upVotePost: (id) => dispatch(voteOnPost(id, 'upVote')),
    downVotePost: (id) => dispatch(voteOnPost(id, 'downVote'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
