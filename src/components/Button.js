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
    type: PropTypes.oneOf(['start', 'stop', 'cancel']),
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'cancel',
  };

  render() {
    let buttonStyle = {};
    switch (this.props.type) {
      case 'start':
        buttonStyle.backgroundColor = Constants.COLOR_GREEN;
        break;
      case 'stop':
        buttonStyle.backgroundColor = Constants.COLOR_RED;
        break;
      case 'cancel':
        buttonStyle.borderColor = Constants.COLOR_GRAY;
        break;
    }

    return (
      <TouchableOpacity style={ [styles.button, buttonStyle] }
        onPress={ this.props.onPress }>
        <Text style={ styles.text }>
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
