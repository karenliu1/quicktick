import React, { Component, PropTypes } from 'react';
import {
  DatePickerIOS,
  View,
} from 'react-native';

import * as Constants from '../Constants';

import Button from './Button';

export default class DatePickerScreen extends Component {
  static propTypes = {
    initialTime: PropTypes.instanceOf(Date).isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.timeZoneOffset = -1 * (new Date()).getTimezoneOffset();
    this.state = { time: this.props.initialTime };
  }

  onChangeTime = (time) => this.setState({ time });
  onSave = () => this.props.onSave(this.state.time);

  render() {
    return (
      <View style={ Constants.STYLES.screen }>
        <View style={ [Constants.STYLES.section, Constants.STYLES.sectionExpand] }>
          <DatePickerIOS
            date={ this.state.time }
            mode="datetime"
            timeZoneOffsetInMinutes={ this.timeZoneOffset }
            onDateChange={ this.onChangeTime }
          />
        </View>

        <View style={ Constants.STYLES.section }>
          <Button type="primary" text="Done" onPress={ this.onSave } />
        </View>
      </View>
    );
  }
}
