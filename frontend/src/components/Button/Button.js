import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    optionalClassNames: PropTypes.string,
    label: PropTypes.string.isRequired
  }

  render() {
    const { handleClick, optionalClassNames, label } = this.props;

    return (
      <button
        className={`${optionalClassNames ? 'btn ' + optionalClassNames : 'btn' }`}
        onClick={handleClick}>
        <span className="btn-content">
          {label}
        </span>
      </button>
    );
  }
}

export default Button;
