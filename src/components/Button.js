import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as Constants from '../Constants';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'warning', 'subdued']),
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'subdued',
  };

  render() {
    let buttonStyle = {};
    let textStyle = {};
    switch (this.props.type) {
      case 'primary':
        buttonStyle.backgroundColor = Constants.COLOR_GREEN;
        break;
      case 'warning':
        buttonStyle.backgroundColor = Constants.COLOR_RED;
        break;
      case 'subdued':
        buttonStyle.borderWidth = StyleSheet.hairlineWidth;
        buttonStyle.borderColor = Constants.COLOR_GRAY;
        textStyle.color = Constants.COLOR_GRAY;
        break;
    }

    return (
      <TouchableOpacity style={ [styles.button, buttonStyle] }
        onPress={ this.props.onPress }>
        <Text style={ [styles.text, textStyle] }>
          { this.props.text }
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: Constants.GUTTER_MD,
  },
  text: {
    color: 'white',
    fontSize: Constants.FONT_SIZE_MD,
    textAlign: 'center',
  },
});
