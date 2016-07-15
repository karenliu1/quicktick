import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import * as Constants from '../Constants';

import Button from './Button';
import InputField from './InputField';
import SectionText from './SectionText';
import TagList from './TagList';

export default class TagEditorScreen extends Component {
  static propTypes = {
    initialTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    recentTags: PropTypes.arrayOf(PropTypes.string).isRequired,

    // This function gets called with all the final applied tags.
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      tags: this.props.initialTags,
    };
  }

  onAddTag = (tag) => {
    tag = tag.trim();
    if (tag) {
      let tagSet = new Set(this.state.tags);
      tagSet.add(tag);
      this.setState({ tags: Array.from(tagSet) });
    }
  };

  onDeleteTag = (tag) => {
    const { tags } = this.state;
    const tagIndex = tags.indexOf(tag);
    this.setState({
      tags: [
        ...tags.slice(0, tagIndex),
        ...tags.slice(tagIndex + 1),
      ],
    });
  };

  onSelect = () => {
    this.props.onSelect(this.state.tags);
  };

  render() {
    return (
      <ScrollView style={[
        Constants.STYLES.scrollableScreen,
        { top: StatusBar.currentHeight },
      ]}>
        <SectionText
          titleText="Tags"
          style={ styles.section }>
          <TagList tags={ this.state.tags } onDeleteTag={ this.onDeleteTag } />
        </SectionText>

        <View style={ styles.section }>
          <InputField onSubmit={ this.onAddTag } icon={ Constants.IMG_GRAY_ADD } />
        </View>

        <View style={ styles.section }>
          <Button type="primary" text="Done" onPress={ this.onSelect } />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: Constants.GUTTER_LG,
  },
});
