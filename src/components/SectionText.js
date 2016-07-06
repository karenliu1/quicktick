import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
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
    onEdit: PropTypes.func,
  };

  renderEditLink() {
    return (
      <TouchableOpacity onPress={ this.props.onEdit }>
        <Text style={ Constants.STYLES.linkText }>
          EDIT
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={ this.props.style }>
        <View style={ styles.row }>
          <TitleText
            style={ styles.titleText }
            text={ this.props.titleText }
          />
          { this.props.onEdit && this.renderEditLink() }
        </View>
        <Text style={ [Constants.STYLES.text, this.props.isLarge && styles.largeText] }>
          { this.props.sectionText }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    flex: 1,
  },
  largeText: {
    fontSize: Constants.FONT_SIZE_XL,
  },
});
