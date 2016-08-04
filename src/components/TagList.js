import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import Tag from './Tag';

export default class TagList extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPressTag: PropTypes.func,
    onDeleteTag: PropTypes.func,
  };

  renderEmptyState() {
    return <Text style={ Constants.STYLES.emptyPlaceholder }>No tags.</Text>;
  }

  render() {
    const hasTags = this.props.tags.length > 0;
    return (
      <View style={ styles.tagContainer }>
        { hasTags ? this.props.tags.map((tag) => (
          <Tag
            tag={ tag } key={ tag }
            onPress={ this.props.onPressTag }
            onDelete={ this.props.onDeleteTag }
          />
        )) : this.renderEmptyState() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
