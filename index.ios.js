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
import Storage from './src/Storage';
import ClockInScreen from './src/components/ClockInScreen';
import ClockOutScreen from './src/components/ClockOutScreen';
import ConfirmScreen from './src/components/ConfirmScreen';

class QuickTick extends Component {
  state = {
    screen: Constants.SCREENS.CLOCK_IN,
    startTime: null,
  };

  onClockIn = () => {
    this.setState({
      screen: Constants.SCREENS.CLOCK_OUT,
      startTime: new Date().toISOString(),
      endTime: null,
    });
  };

  onClockOut = () => {
    this.setState({
      screen: Constants.SCREENS.CONFIRM,
      endTime: new Date().toISOString(),
    });
  };

  onConfirm = async (notes) => {
    try {
      await Storage.saveSession(this.state.startTime, this.state.endTime, notes);
    } catch (error) {
      // TODO: Display this error
      console.error(error);
    }
    this.setState({
      screen: Constants.SCREENS.CLOCK_IN,
      startTime: null,
      endTime: null,
    });
  };

  onCancel = () => {
    this.setState({
      screen: Constants.SCREENS.CLOCK_IN,
      startTime: null,
      endTime: null,
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
            startTime={ this.state.startTime }
            onClockOut={ this.onClockOut }
            onCancel={ this.onCancel }
          />
        );
      case Constants.SCREENS.CONFIRM:
        return (
          <ConfirmScreen startTime={ this.state.startTime }
            endTime={ this.state.endTime }
            onConfirm={ this.onConfirm }
            onCancel={ this.onCancel }
          />
        );
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
