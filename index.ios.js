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

import * as Constants from './src/Constants.js';
import ClockInScreen from './src/components/ClockInScreen.js';
import ClockOutScreen from './src/components/ClockOutScreen.js';

class QuickTick extends Component {
  state = {
    screen: Constants.SCREENS.CLOCK_IN,
  };

  onClockIn = () => {
    this.setState({ screen: Constants.SCREENS.CLOCK_OUT });
  };

  render() {
    switch (this.state.screen) {
      case Constants.SCREENS.CLOCK_IN:
        return <ClockInScreen currentTime={ new Date().toISOString() }
          lastSessionStart={ new Date().toISOString() }
          lastSessionEnd={ new Date().toISOString() }
          onClockIn={ this.onClockIn }
        />;
      case Constants.SCREENS.CLOCK_OUT:
        return <ClockOutScreen />;
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
