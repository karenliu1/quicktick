/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  View
} from 'react-native';

import * as Constants from './src/Constants';
import Storage from './src/Storage';
import ClockInScreen from './src/components/ClockInScreen';
import ClockOutScreen from './src/components/ClockOutScreen';
import ConfirmScreen from './src/components/ConfirmScreen';
import HistoryScreen from './src/components/HistoryScreen';
import Menu from './src/components/Menu';

class QuickTick extends Component {
  state = {
    isMenuExpanded: false,
    sessions: [],
    startTime: null,
    endTime: null,
  };

  async componentDidMount() {
    let sessions;
    try {
      sessions = await Storage.getSessions();
    } catch (error) {
      // TODO: Display this error
      console.error(error);
    }
    this.setState({sessions});
  }

  onClockIn = (route, navigator) => {
    const now = new Date().toISOString();
    this.setState({
      startTime: now,
      endTime: null,
    });
    navigator.push({
      name: Constants.SCREENS.CLOCK_OUT,
      index: route.index + 1,
    });
  };

  onClockOut = (route, navigator) => {
    const now = new Date().toISOString();
    this.setState({
      endTime: now,
    });
    navigator.push({
      name: Constants.SCREENS.CONFIRM,
      index: route.index + 1,
    });
  };

  onConfirm = async (route, navigator, notes) => {
    try {
      await Storage.saveSession(this.state.startTime, this.state.endTime, notes);
    } catch (error) {
      // TODO: Display this error
      console.error(error);
    }
    this.setState({
      startTime: null,
      endTime: null,
    });
    navigator.popToTop();
  };

  onCancel = (route, navigator) => {
    this.setState({
      startTime: null,
      endTime: null,
    });
    navigator.popToTop();
  };

  onToggleMenu = () => {
    this.setState({
      isMenuExpanded: !this.state.isMenuExpanded
    });
  };

  render() {
    const menuEl = (
      <Menu
        onToggle={ this.onToggleMenu }
        isExpanded={ this.state.isMenuExpanded }
      />
    );
    return (
      <Navigator initialRoute={{ name: Constants.SCREENS.CLOCK_IN, index: 0 }}
        renderScene={(route, navigator) => this.renderScreen(route, navigator)}
        navigationBar={ menuEl }
      />
    );
  }

  renderScreen(route, navigator) {
    let fakeDate = new Date();
    fakeDate.setHours(fakeDate.getHours() - 4);
    fakeDate.setMinutes(fakeDate.getMinutes() - 2);

    switch (route.name) {
      case Constants.SCREENS.CLOCK_IN:
        return (
          <ClockInScreen currentTime={ new Date().toISOString() }
            prevStartTime={ new Date().toISOString() }
            prevEndTime={ new Date().toISOString() }
            onClockIn={ () => this.onClockIn(route, navigator) }
          />
        );
      case Constants.SCREENS.CLOCK_OUT:
        return (
          <ClockOutScreen currentTime={ new Date().toISOString() }
            startTime={ this.state.startTime }
            onClockOut={ () => this.onClockOut(route, navigator) }
            onCancel={ () => this.onCancel(route, navigator) }
          />
        );
      case Constants.SCREENS.CONFIRM:
        return (
          <ConfirmScreen startTime={ this.state.startTime }
            endTime={ this.state.endTime }
            onConfirm={ (notes) => this.onConfirm(route, navigator, notes) }
            onCancel={ () => this.onCancel(route, navigator) }
          />
        );
      case Constants.SCREENS.HISTORY:
        return <HistoryScreen sessions={this.state.sessions} />;
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
