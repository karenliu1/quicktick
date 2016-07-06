import React, { Component, PropTypes } from 'react';
import {
  DatePickerIOS,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { formatDate, formatRange, formatTotal } from '../Utilities';

import Button from './Button';
import SectionText from './SectionText';
import TitleText from './TitleText';

export default class DetailScreen extends Component {
  static propTypes = {
    sessionId: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    notes: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.timeZoneOffsetInHours = (-1) * (new Date()).getTimezoneOffset() / 60
    this.state = {
      notes: this.props.notes,
      startTime: new Date(this.props.startTime),
      endTime: new Date(this.props.endTime),
    };
  }

  onChangeNotes = (notes) => this.setState({ notes });
  onChangeStartTime = (startTime) => this.setState({ startTime });
  onChangeEndTime = (endTime) => this.setState({ endTime });

  onSave = () => {
    this.props.onSave(
      this.props.sessionId,
      this.state.startTime,
      this.state.endTime,
      this.state.notes
    );
  };

  render() {
    const date = formatDate(this.state.startTime);
    const total = formatTotal(this.state.startTime, this.state.endTime);
    const range = formatRange(this.state.startTime, this.state.endTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <ScrollView>
          <View style={ styles.title }>
            <Text style={ [Constants.STYLES.text, styles.date] }>
              { date }
            </Text>
            <Text style={ [Constants.STYLES.text, styles.range] }>
              { range }
            </Text>
          </View>

          <SectionText
            titleText="Total Time" sectionText={ total }
            style={ styles.section }
          />

          <View style={ styles.section }>
            <TitleText text="Clock In" />
            <DatePickerIOS
              date={ this.state.startTime }
              mode="datetime"
              timeZoneOffsetInMinutes={ this.timeZoneOffsetInHours * 60 }
              onDateChange={ this.onChangeStartTime }
            />
          </View>

          <View style={ styles.section }>
            <TitleText text="Clock Out" />
            <DatePickerIOS
              date={ this.state.endTime }
              mode="datetime"
              timeZoneOffsetInMinutes={ this.timeZoneOffsetInHours * 60 }
              onDateChange={ this.onChangeEndTime }
            />
          </View>

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
