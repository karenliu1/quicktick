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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { formatDate, formatRange, formatTime, formatTotal } from '../Utilities';
import { editSession, deleteSession } from '../actions/sessions';

import Button from './Button';
import SectionText from './SectionText';
import TagList from './TagList';
import TitleText from './TitleText';

class DetailScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    initialSession: SessionPropType.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      notes: this.props.initialSession.notes,
      startTime: this.props.initialSession.startTime,
      endTime: this.props.initialSession.endTime,
      tags: this.props.initialSession.tags,
    };
  }

  onChangeNotes = (notes) => this.setState({ notes }, this.onSave);

  onChangeStartTime = () => {
    Actions.historyDatePickerScreen({
      initialTime: this.state.startTime,
      onSave: (time) => {
        this.setState({ startTime: new Date(time) }, this.onSave);
      },
    });
  }

  onChangeEndTime = () => {
    Actions.historyDatePickerScreen({
      initialTime: this.state.endTime,
      onSave: (time) => {
        this.setState({ endTime: new Date(time) }, this.onSave);
      },
    });
  }

  onChangeTags = () => {
    Actions.tagEditorScreen({
      initialTags: this.state.tags,
      onSelect: (tags) => {
        this.setState({ tags }, this.onSave);
      },
    });
  }

  onSave = () => {
    this.props.dispatch(editSession({
      id: this.props.initialSession.id,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      notes: this.state.notes,
      tags: this.state.tags,
    }));
  };

  onDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Delete session', 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        this.props.dispatch(deleteSession(this.props.initialSession.id));
        Actions.pop();
      }
    });
  };

  onDone = () => {
    Actions.pop();
  };

  render() {
    return (
      <ScrollView style={[
        Constants.STYLES.scrollableScreen, Constants.STYLES.screenReducedPadding
      ]}>
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
              source={ Constants.IMG_RED_DELETE }
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
            blurOnSubmit
            returnKeyType="done"
            numberOfLines={ 3 }
            style={ [Constants.STYLES.input, styles.notesInput] }
            onChangeText={ this.onChangeNotes }
            value={ this.state.notes }
          />
        </View>

        <SectionText
          titleText="Tags"
          style={ styles.section }
          onEdit={ this.onChangeTags }>
          <TagList tags={ this.state.tags } />
        </SectionText>

        <View style={ styles.section }>
          <Button type="primary" text="Done" onPress={ this.onDone } />
        </View>
      </ScrollView>
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
});

export default connect()(DetailScreen);
