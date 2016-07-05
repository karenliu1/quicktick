import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TitleText from './TitleText';

import * as Constants from '../Constants';

export default class SectionText extends Component {
  static propTypes = {
    titleText: PropTypes.string.isRequired,
    sectionText: PropTypes.string.isRequired,
    isLarge: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  };

  render() {
    return (
      <View style={ this.props.style }>
        <TitleText text={ this.props.titleText } />
        <Text style={ [Constants.STYLES.text, this.props.isLarge && styles.largeText] }>
          { this.props.sectionText }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  largeText: {
    fontSize: Constants.FONT_SIZE_XL,
  },
});
