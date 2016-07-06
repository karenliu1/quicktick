/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import * as Constants from './src/Constants';
import Storage from './src/Storage';
import ClockScreen from './src/components/ClockScreen';
import DetailScreen from './src/components/DetailScreen';
import HistoryScreen from './src/components/HistoryScreen';
import Menu from './src/components/Menu';

class QuickTick extends Component {
  state = {
    isMenuExpanded: false,

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
      throw error;
    }
    this.sessions = sessions;
  }

  onClockIn = () => this.setState({ startTime: new Date().toISOString() });
  onClockOut = () => this.setState({ endTime: new Date().toISOString() });
  onCancel = () => this.setState({ startTime: null, endTime: null });

  onConfirm = async (notes) => {
    try {
      await Storage.createSession(this.state.startTime, this.state.endTime, notes);
      this.setState({ startTime: null, endTime: null });
    } catch (error) {
      // TODO: Display this error
      throw error;
    }
  };

  onToggleMenu = () => this.setState({ isMenuExpanded: !this.state.isMenuExpanded });

  onEditBegin(navigator, session) {
    navigator.push({ name: Constants.SCREENS.DETAIL, session: session });
  }

  async onEditSave(navigator, session) {
    await Storage.editSession(session);
    navigator.pop();
  }

  onEditCancel(navigator) {
    navigator.pop();
  }

  render() {
    const menuEl = (
      <Menu
        onToggle={ this.onToggleMenu }
        isExpanded={ this.state.isMenuExpanded }
      />
    );
    return (
      <Navigator
        initialRoute={{ name: Constants.SCREENS.CLOCK }}
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
        return (
          <HistoryScreen
            sessions={ this.sessions }
            onEdit={ (session) => this.onEditBegin(navigator, session) }
          />
        );
      case Constants.SCREENS.DETAIL:
        return (
          <DetailScreen
            initialSession={ route.session }
            onSave={ (session) => this.onEditSave(navigator, session) }
            onCancel={ () => this.onEditCancel(navigator) }
          />
        );
    }
  }
}

AppRegistry.registerComponent('QuickTick', () => QuickTick);
