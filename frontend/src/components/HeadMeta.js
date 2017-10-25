import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class HeadMeta extends Component {
  render() {
    return (
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Helmet>
    );
  }
}

export default HeadMeta;
