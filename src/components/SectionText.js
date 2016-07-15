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
    color: PropTypes.string,
    isLarge: PropTypes.bool,
    onEdit: PropTypes.func,
    sectionText: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    titleText: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    color: Constants.COLOR_DARK_GRAY,
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
        { this.renderSectionText() }
        { this.props.children }
      </View>
    );
  }

  renderSectionText() {
    if (!this.props.sectionText) { return null; }

    return (
      <Text style={ [
        Constants.STYLES.text,
        this.props.isLarge && styles.largeText,
        { color: this.props.color },
      ] }>
        { this.props.sectionText }
      </Text>
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
