import React, { Component, PropTypes } from 'react';
import {
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
    navigator: PropTypes.object,
    initialSession: SessionPropType.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      notes: this.props.initialSession.notes,
      startTime: new Date(this.props.initialSession.startTime),
      endTime: new Date(this.props.initialSession.endTime),
    };
  }

  onChangeNotes = (notes) => this.setState({ notes });

  onChangeStartTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.startTime.toISOString(),
      onSave: (time) => {
        this.setState({ startTime: new Date(time) });
      },
    });
  }

  onChangeEndTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.endTime.toISOString(),
      onSave: (time) => this.setState({ endTime: new Date(time) }),
    });
  }

  onSave = () => {
    this.props.onSave({
      id: this.props.initialSession.id,
      startTime: this.state.startTime.toISOString(),
      endTime: this.state.endTime.toISOString(),
      notes: this.state.notes,
    });
  };

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

          <SectionText
            titleText="Total Time"
            sectionText={ formatTotal(this.state.startTime, this.state.endTime) }
            style={ styles.section }
          />

          <SectionText
            titleText="Clock In"
            sectionText={ formatTime(this.state.startTime) }
            style={ styles.section }
          />
          <TouchableOpacity onPress={ this.onChangeStartTime }>
            <Text style={ Constants.STYLES.linkText }>
              EDIT
            </Text>
          </TouchableOpacity>

          <SectionText
            titleText="Clock Out"
            sectionText={ formatTime(this.state.endTime) }
            style={ styles.section }
          />
          <TouchableOpacity onPress={ this.onChangeEndTime }>
            <Text style={ Constants.STYLES.linkText }>
              EDIT
            </Text>
          </TouchableOpacity>

          <View style={ styles.section }>
            <TitleText text="Notes" />
            <TextInput
              multiline
              numberOfLines={ 3 }
              style={ [Constants.STYLES.input, styles.input] }
              onChangeText={ this.onChangeNotes }
              value={ this.state.notes }
            />
          </View>

          <View style={ styles.section }>
            <Button type="start" text="Save" onPress={ this.onSave } />
            <Button type="cancel" text="Cancel" onPress={ this.props.onCancel } />
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
  input: {
    height: Constants.FONT_SIZE_MD * 4 + Constants.GUTTER_MD * 2,
    marginTop: Constants.GUTTER_MD,
  },
});
