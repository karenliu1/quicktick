import React, { Component, PropTypes } from 'react';
import {
  ActionSheetIOS,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { formatDate, formatRange, formatTime, formatTotal } from '../Utilities';

import Button from './Button';
import SectionText from './SectionText';
import TitleText from './TitleText';

export default class DetailScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    initialSession: SessionPropType.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      notes: this.props.initialSession.notes,
      startTime: this.props.initialSession.startTime,
      endTime: this.props.initialSession.endTime,
      tags: this.props.initialSession.tags || [],
      newTag: '',
    };
  }

  onChangeNotes = (notes) => this.setState({ notes });
  onChangeNewTag = (newTag) => this.setState({ newTag });

  onAddTag = () => {
    const newTag = this.state.newTag.trim();
    if (newTag) {
      let tagSet = new Set(this.state.tags);
      tagSet.add(newTag);
      this.setState({
        newTag: '',
        tags: Array.from(tagSet),
      });
    }
  };

  onRemoveTag = (tag) => {
    const { tags } = this.state;
    const tagIndex = tags.indexOf(tag);
    this.setState({
      tags: [
        ...tags.slice(0, tagIndex),
        ...tags.slice(tagIndex + 1),
      ],
    });
  };

  onChangeStartTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.startTime,
      onSave: (time) => {
        this.setState({ startTime: new Date(time) });
      },
    });
  }

  onChangeEndTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.endTime,
      onSave: (time) => this.setState({ endTime: new Date(time) }),
    });
  }

  onSave = () => {
    this.props.onSave({
      id: this.props.initialSession.id,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      notes: this.state.notes,
      tags: this.state.tags,
    });
  };

  onDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Delete session', 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        this.props.onDelete();
      }
    });
  };

  renderTags() {
    return (
      <View style={ styles.tagContainer }>
        { this.state.tags.map((tag) => (
          <View style={ styles.tag } key={ tag }>
            <Text style={ styles.tagText }>{ tag }</Text>
            <TouchableOpacity onPress={ () => this.onRemoveTag(tag) }>
              <Image
                source={ Constants.IMG_X }
                style={ styles.tagDeleteIcon }
              />
            </TouchableOpacity>
          </View>
        )) }
      </View>
    );
  }

  render() {
    return (
      <View style={ Constants.STYLES.screen }>
        <ScrollView>
          <View style={ styles.title }>
            <Text style={ [Constants.STYLES.text, styles.date] }>
              { formatDate(this.state.startTime) }
            </Text>
            <Text style={ [Constants.STYLES.text, styles.range] }>
              { formatRange(this.state.startTime, this.state.endTime) }
            </Text>
          </View>

          <View style={ [styles.section, styles.row] }>
            <SectionText
              titleText="Total Time"
              sectionText={ formatTotal(this.state.startTime, this.state.endTime) }
            />
            <TouchableOpacity onPress={ this.onDelete }>
              <Image
                source={ Constants.IMG_DELETE }
                style={ Constants.STYLES.icon }
              />
            </TouchableOpacity>
          </View>

          <SectionText
            titleText="Clock In"
            sectionText={ formatTime(this.state.startTime) }
            style={ styles.section }
            onEdit={ this.onChangeStartTime }
          />

          <SectionText
            titleText="Clock Out"
            sectionText={ formatTime(this.state.endTime) }
            style={ styles.section }
            onEdit={ this.onChangeEndTime }
          />

          <View style={ styles.section }>
            <TitleText text="Notes" />
            <TextInput
              multiline
              numberOfLines={ 3 }
              style={ [Constants.STYLES.input, styles.notesInput] }
              onChangeText={ this.onChangeNotes }
              value={ this.state.notes }
            />
          </View>

          <View style={ styles.section }>
            <TitleText text="Tags" />
            { this.renderTags() }
            <View style={ [styles.row, styles.tagRow] }>
              <TextInput
                autoCapitalize="none"
                style={ [Constants.STYLES.input, styles.tagInput] }
                onChangeText={ this.onChangeNewTag }
                value={ this.state.newTag }
              />
              <TouchableOpacity onPress={ this.onAddTag }>
                <Image
                  source={ Constants.IMG_ADD }
                  style={ Constants.STYLES.icon }
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.section }>
            <Button type="primary" text="Save" onPress={ this.onSave } />
          </View>
          <View style={ styles.section }>
            <Button type="subdued" text="Cancel" onPress={ this.props.onCancel } />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: Constants.GUTTER_MD,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    marginTop: Constants.GUTTER_MD,
    paddingBottom: Constants.GUTTER_MD,
  },
  date: {
    fontSize: Constants.FONT_SIZE_LG,
    marginRight: Constants.GUTTER_MD,
  },
  range: {
    flex: 1,
  },
  notesInput: {
    height: Constants.FONT_SIZE_MD * 4 + Constants.GUTTER_MD * 2,
    marginTop: Constants.GUTTER_MD,
  },
  tagRow: {
    marginTop: Constants.GUTTER_MD,
  },
  tagInput: {
    height: Constants.FONT_SIZE_MD + Constants.GUTTER_MD * 2,
    flex: 1,
    marginRight: Constants.GUTTER_MD,
  },
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
    marginRight: Constants.GUTTER_SM,
  },
  tagDeleteIcon: {
    backgroundColor: Constants.COLOR_BLUE,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,

    height: Constants.FONT_SIZE_MD,
    width: Constants.FONT_SIZE_MD,
    resizeMode: 'contain',
  },
});
