/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import * as Constants from './src/Constants';
import ClockInScreen from './src/components/ClockInScreen';
import ClockOutScreen from './src/components/ClockOutScreen';
import ConfirmScreen from './src/components/ConfirmScreen';

class QuickTick extends Component {
  state = {
    screen: Constants.SCREENS.CLOCK_IN,
    clockInTime: null,
  };

  onClockIn = () => {
    this.setState({
      screen: Constants.SCREENS.CLOCK_OUT,
      clockInTime: new Date().toISOString(),
    });
  };

  onClockOut = () => {
    this.setState({
      screen: Constants.SCREENS.CONFIRM,
    });
  };

  onCancel = () => {
    this.setState({
      screen: Constants.SCREENS.CLOCK_IN,
    });
  };

  render() {
    let fakeDate = new Date();
    fakeDate.setHours(fakeDate.getHours() - 4);
    fakeDate.setMinutes(fakeDate.getMinutes() - 2);

    switch (this.state.screen) {
      case Constants.SCREENS.CLOCK_IN:
        return (
          <ClockInScreen currentTime={ new Date().toISOString() }
            prevStartTime={ new Date().toISOString() }
            prevEndTime={ new Date().toISOString() }
            onClockIn={ this.onClockIn }
          />
        );
      case Constants.SCREENS.CLOCK_OUT:
        return (
          <ClockOutScreen currentTime={ new Date().toISOString() }
            clockedInTime={ fakeDate.toISOString() }
            onClockOut={ this.onClockOut }
            onCancel={ this.onCancel }
          />
        );
      case Constants.SCREENS.CONFIRM:
        return (
          <ConfirmScreen clockedInTime={ fakeDate.toISOString() }
            clockedOutTime={ new Date().toISOString() }
            onConfirm={ this.onCancel }
            onCancel={ this.onCancel }
          />
        );
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
