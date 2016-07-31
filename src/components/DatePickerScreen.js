import React, { Component, PropTypes } from 'react';
import {
  DatePickerIOS,
  StyleSheet,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as Constants from '../Constants';

import Button from './Button';

export default class DatePickerScreen extends Component {
  static propTypes = {
    initialTime: PropTypes.instanceOf(Date),
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialTime: new Date(),
  };

  constructor(props, context) {
    super(props, context);
    this.timeZoneOffset = -1 * (new Date()).getTimezoneOffset();
    this.state = { time: this.props.initialTime };
  }

  onChangeTime = (time) => this.setState({ time });
  onSave = () => {
    this.props.onSave(this.state.time);
    Actions.pop();
  }

  render() {
    return (
      <View style={ [Constants.STYLES.screen, styles.screen] }>
        <View style={ Constants.STYLES.section }>
          <DatePickerIOS
            date={ this.state.time }
            mode="datetime"
            timeZoneOffsetInMinutes={ this.timeZoneOffset }
            onDateChange={ this.onChangeTime }
          />
        </View>

        <View style={ [Constants.STYLES.section, styles.button] }>
          <Button type="primary" text="Done" onPress={ this.onSave } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 0, // Make space for the date picker
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: Constants.GUTTER_LG,
  },
});
