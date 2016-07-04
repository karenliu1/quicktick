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
import ClockScreen from './src/components/ClockScreen';
import HistoryScreen from './src/components/HistoryScreen';
import Menu from './src/components/Menu';

class QuickTick extends Component {
  state = {
    isMenuExpanded: false,
    sessions: [],

    // Times for the current session (if any)
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

  onClockIn = () => this.setState({ startTime: new Date().toISOString() });
  onClockOut = () => this.setState({ endTime: new Date().toISOString() });
  onCancel = () => this.setState({ startTime: null, endTime: null });

  onConfirm = async (notes) => {
    try {
      await Storage.saveSession(this.state.startTime, this.state.endTime, notes);
      this.setState({ startTime: null, endTime: null });
    } catch (error) {
      // TODO: Display this error
      console.error(error);
    }
  };

  onToggleMenu = () => this.setState({ isMenuExpanded: !this.state.isMenuExpanded });

  render() {
    const menuEl = (
      <Menu
        onToggle={ this.onToggleMenu }
        isExpanded={ this.state.isMenuExpanded }
      />
    );
    return (
      <Navigator initialRoute={{ name: Constants.SCREENS.CLOCK }}
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
      case Constants.SCREENS.CLOCK:
        return (
          <ClockScreen
            startTime={ this.state.startTime }
            endTime={ this.state.endTime }
            onClockIn={ this.onClockIn }
            onClockOut={ this.onClockOut }
            onConfirm={ this.onConfirm }
            onCancel={ this.onCancel }
          />
        );
      case Constants.SCREENS.HISTORY:
        return <HistoryScreen sessions={ this.state.sessions } />;
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
