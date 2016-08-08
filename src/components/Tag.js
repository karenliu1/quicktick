import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as Constants from '../Constants';

export default class Tag extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool,
    onPress: PropTypes.func,

    // If not specified, no delete buttons are rendered
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    onPress: () => {},
    isHighlighted: true,
  };

  renderDeleteButton() {
    return (
      <TouchableOpacity onPress={ () => this.props.onDelete(this.props.tag) }>
        <Image
          source={ Constants.IMG_CIRCLE_X }
          style={[
            styles.tagDeleteIcon,
            this.props.isHighlighted && styles.highlightedTagDeleteIcon
          ]}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        onPress={ () => this.props.onPress(this.props.tag) }
        style={[ styles.tag, this.props.isHighlighted && styles.highlightedTag ]}>
        <Text style={ styles.tagText }>{ this.props.tag }</Text>

        { this.props.onDelete && this.renderDeleteButton() }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Constants.COLOR_GRAY,
    borderRadius: 10,
    marginTop: Constants.GUTTER_SM,
    marginRight: Constants.GUTTER_SM,
    padding: 5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightedTag: {
    backgroundColor: Constants.COLOR_BLUE,
  },
  tagText: {
    color: 'white',
  },
  tagDeleteIcon: {
    backgroundColor: Constants.COLOR_GRAY,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: Constants.GUTTER_SM,
    tintColor: 'white',

    height: Constants.FONT_SIZE_MD,
    width: Constants.FONT_SIZE_MD,
    resizeMode: 'contain',
  },
  highlightedTagDeleteIcon: {
    backgroundColor: Constants.COLOR_BLUE,
  },
});
