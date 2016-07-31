import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import * as Constants from '../Constants';

export default class ClockIcon extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    iconUrl: PropTypes.object,
    title: PropTypes.string,
  };

  render() {
    return <View style={ styles.container }>
      <Image
        source={ this.props.iconUrl }
        style={ [Constants.STYLES.icon, this.props.selected && styles.selectedImage ] }
      />
      <Text style={ [styles.text, this.props.selected && styles.selectedText] }>
        { this.props.title }
      </Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: Constants.FONT_SIZE_XS,
    marginTop: 2,
  },
  selectedImage: {
    tintColor: Constants.COLOR_BLUE,
  },
  selectedText: {
    color: Constants.COLOR_BLUE,
  },
});
