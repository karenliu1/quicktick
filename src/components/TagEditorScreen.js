import React, { Component, PropTypes } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as Constants from '../Constants';

import Button from './Button';
import InputField from './InputField';
import SectionText from './SectionText';
import TitleText from './TitleText';
import TagList from './TagList';

const MAX_RECENT_TAGS = 5;

class TagEditorScreen extends Component {
  static propTypes = {
    initialTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    allTags: PropTypes.arrayOf(PropTypes.string).isRequired,

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
    Actions.pop();
  };

  render() {
    return (
      <ScrollView style={[
        Constants.STYLES.scrollableScreen, Constants.STYLES.screenReducedPadding
      ]}>
        <SectionText
          titleText="Tags"
          style={ styles.section }>
          <TagList tags={ this.state.tags } onDeleteTag={ this.onDeleteTag } />
        </SectionText>

        <SectionText
          titleText="Add a Tag"
          style={ styles.section }>
          <InputField onSubmit={ this.onAddTag } icon={ Constants.IMG_GRAY_ADD } />
        </SectionText>

        { this.renderRecentTags() }

        <View style={ styles.section }>
          <Button type="primary" text="Done" onPress={ this.onSelect } />
        </View>
      </ScrollView>
    );
  }

  getRecentTagsToShow() {
    // Only show tags that have not already been applied
    return this.props.allTags.filter((tag) => (
      this.state.tags.indexOf(tag) === -1
    )).slice(0, MAX_RECENT_TAGS);
  }

  renderRecentTags() {
    const tags = this.getRecentTagsToShow();
    if (tags.length === 0) { return null; }
    return (
      <View style={ styles.section }>
        <View style={ styles.recentTagsHeader }>
          <TitleText text="Recent Tags" />
        </View>
        { tags.map(this.renderRecentTag) }
      </View>
    );
  }

  renderRecentTag = (tag) => {
    return (
      <View style={ styles.recentTagRow } key={ tag }>
        <Text style={ Constants.STYLES.text }>{ tag }</Text>

        <TouchableOpacity onPress={ () => this.onAddTag(tag) }>
          <Image
            source={ Constants.IMG_GRAY_ADD }
            style={ Constants.STYLES.icon }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: Constants.GUTTER_LG,
  },
  recentTagsHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    paddingBottom: Constants.GUTTER_MD,
  },
  recentTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Constants.GUTTER_SM,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
  },
});

const mapStateToProps = (state) => {
  let allTags = [];
  state.sessions.forEach((session) => allTags = allTags.concat(session.tags));
  return {
    allTags: Array.from(new Set(allTags)),
  };
};

export default connect(mapStateToProps)(TagEditorScreen);
