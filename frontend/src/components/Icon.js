import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired
  }
  render() {
    const { className, type } = this.props;

    return (
      <svg className={ `${ className } icon` }>
        <use xlinkHref={ `#${ type }` }></use>
      </svg>
    );
  }
}

export default Icon;
