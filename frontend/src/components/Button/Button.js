import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

class Button extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    optionalClassNames: PropTypes.string,
    label: PropTypes.string.isRequired
  }

  renderOptionalIcon(icon) {
    if (icon) {
     return <Icon type={icon} />;
    }
  }

  render() {
    const { handleClick, optionalClassNames, label, icon } = this.props;

    return (
      <button
        className={`${optionalClassNames ? 'btn ' + optionalClassNames : 'btn' }`}
        onClick={handleClick}>
        <span className="btn-content">
          {label}
          {this.renderOptionalIcon(icon)}
        </span>
      </button>
    );
  }
}

export default Button;
