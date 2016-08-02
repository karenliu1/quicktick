import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import * as Constants from '../Constants';

export default class TagList extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPressTag: PropTypes.func,

    // If not specified, no delete buttons are rendered
    onDeleteTag: PropTypes.func,
  };

  static defaultProps = {
    onPressTag: () => {},
  };

  renderDeleteButton(tag) {
    return (
      <TouchableOpacity onPress={ () => this.props.onDeleteTag(tag) }>
        <Image
          source={ Constants.IMG_WHITE_CIRCLE_X }
          style={ styles.tagDeleteIcon }
        />
      </TouchableOpacity>
    );
  }

  renderTag = (tag) => {
    return (
      <TouchableOpacity
        onPress={ () => this.props.onPressTag(tag) }
        style={ styles.tag } key={ tag }>
        <Text style={ styles.tagText }>{ tag }</Text>

        { this.props.onDeleteTag && this.renderDeleteButton(tag) }
      </TouchableOpacity>
    );
  };

  renderEmptyState() {
    return <Text style={ Constants.STYLES.emptyPlaceholder }>No tags.</Text>;
  }

  render() {
    const hasTags = this.props.tags.length > 0;
    return (
      <View style={ styles.tagContainer }>
        { hasTags ? this.props.tags.map(this.renderTag) : this.renderEmptyState() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Constants.COLOR_BLUE,
    borderRadius: 10,
    marginTop: Constants.GUTTER_SM,
    marginRight: Constants.GUTTER_SM,
    padding: 5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
  },
  tagDeleteIcon: {
    backgroundColor: Constants.COLOR_BLUE,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: Constants.GUTTER_SM,

    height: Constants.FONT_SIZE_MD,
    width: Constants.FONT_SIZE_MD,
    resizeMode: 'contain',
  },
});
