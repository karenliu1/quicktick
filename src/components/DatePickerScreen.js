import React, { Component, PropTypes } from 'react';
import {
  DatePickerIOS,
  View,
} from 'react-native';

import * as Constants from '../Constants';

import Button from './Button';

export default class DatePickerScreen extends Component {
  static propTypes = {
    initialTime: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.timeZoneOffset = -1 * (new Date()).getTimezoneOffset();
    this.state = { time: new Date(this.props.initialTime) };
  }

  onChangeTime = (time) => this.setState({ time });
  onSave = () => this.props.onSave(this.state.time.toISOString());

  render() {
    return (
      <View style={ Constants.STYLES.screen }>
        <View style={ Constants.STYLES.section }>
          <DatePickerIOS
            date={ this.state.time }
            mode="datetime"
            timeZoneOffsetInMinutes={ this.timeZoneOffset }
            onDateChange={ this.onChangeTime }
          />
        </View>

        <View style={ Constants.STYLES.section }>
          <Button type="start" text="Save" onPress={ this.onSave } />
          <Button type="cancel" text="Cancel" onPress={ this.props.onCancel } />
        </View>
      </View>
    );
  }
}
