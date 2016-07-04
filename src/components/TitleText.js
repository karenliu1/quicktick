import React, { Component, PropTypes } from 'react';
import {
  Text,
} from 'react-native';

import * as Constants from '../Constants';

export default class TitleText extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return (
      <Text style={ Constants.STYLES.text }>
        { this.props.text.toUpperCase() }
      </Text>
    );
  }
}
