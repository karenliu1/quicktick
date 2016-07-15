/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  View,
} from 'react-native';

import * as Constants from './src/Constants';
import Storage from './src/Storage';
import ClockScreen from './src/components/ClockScreen';
import DatePickerScreen from './src/components/DatePickerScreen';
import DetailScreen from './src/components/DetailScreen';
import HistoryScreen from './src/components/HistoryScreen';
import Menu from './src/components/Menu';
import TagEditorScreen from './src/components/TagEditorScreen';
import TotalsScreen from './src/components/TotalsScreen';

class QuickTick extends Component {
  state = {
    isMenuExpanded: false,

    // Times for the current session (if any)
    startTime: null,
    sessions: [],
  };

  constructor(props, context) {
    super(props, context);
    this.fetchSessions();
  }

  async fetchSessions() {
    try {
      const sessions = await Storage.getSessions();
      this.setState({ sessions });
    } catch (error) {
      // TODO: Display this error
      throw error;
    }
  }

  onClockIn = () => this.setState({ startTime: new Date() });

  // TODO: Display any errors from this operation
  onClockOut = async () => {
    const endTime = new Date();
    const session = await Storage.createSession(this.state.startTime, endTime);
    this.state.sessions.push(session);
    this.setState({ startTime: null });
  }

  onToggleMenu = () => this.setState({ isMenuExpanded: !this.state.isMenuExpanded });

  onEditBegin(navigator, session) {
    navigator.push({ name: Constants.SCREENS.DETAIL, session: session });
  }

  onEditCancel(navigator) {
    navigator.pop();
  }

  async onEditSave(navigator, session) {
    try {
      await Storage.editSession(session);
    } catch (error) {
      // TODO: Display this error
      throw error;
    }
    const sessionIndex = this.state.sessions.findIndex((s) => s.id === session.id);
    this.setState({
      sessions: [
        ...this.state.sessions.slice(0, sessionIndex),
        session,
        ...this.state.sessions.slice(sessionIndex + 1)
      ],
    });
    navigator.pop();
  }

  async onEditDelete(navigator, session) {
    try {
      await Storage.deleteSession(session);
    } catch (error) {
      // TODO: Display this error
      throw error;
    }
    const sessionIndex = this.state.sessions.findIndex((s) => s.id === session.id);
    this.setState({
      sessions: [
        ...this.state.sessions.slice(0, sessionIndex),
        ...this.state.sessions.slice(sessionIndex + 1)
      ],
    });
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
        renderScene={(route, navigator) => (
          <View style={ styles.background }>
            { this.renderScreen(route, navigator) }
          </View>
        )}
        navigationBar={ menuEl }
      />
    );
  }

  renderScreen(route, navigator) {
    const sessions = this.state.sessions;
    const lastSession = sessions && sessions.length > 0 ?
      sessions[sessions.length - 1] : null;

    switch (route.name) {
      case Constants.SCREENS.CLOCK:
        return (
          <ClockScreen
            navigator={ navigator }
            lastSession={ lastSession }
            startTime={ this.state.startTime }
            onClockIn={ this.onClockIn }
            onClockOut={ this.onClockOut }
          />
        );
      case Constants.SCREENS.HISTORY:
        return (
          <HistoryScreen
            navigator={ navigator }
            sessions={ this.state.sessions }
            onEdit={ (session) => this.onEditBegin(navigator, session) }
          />
        );
      case Constants.SCREENS.DETAIL:
        return (
          <DetailScreen
            navigator={ navigator }
            initialSession={ route.session }
            onCancel={ () => this.onEditCancel(navigator) }
            onSave={ (session) => this.onEditSave(navigator, session) }
            onDelete={ () => this.onEditDelete(navigator, route.session) }
          />
        );
      case Constants.SCREENS.DATE_PICKER:
        return (
          <DatePickerScreen
            initialTime={ route.initialTime }
            onSave={ (time) => {
              route.onSave(time);
              navigator.pop();
            } }
          />
        );
      case Constants.SCREENS.TOTALS:
        return <TotalsScreen navigator={ navigator } sessions={ this.state.sessions } />;
      case Constants.SCREENS.TAG_EDITOR:
        // TODO: Make this recent tags
        const allTags = this.state.sessions.reduce((tagsSoFar, session) => (
          tagsSoFar.concat(session.tags || [])
        ), []);

        return (
          <TagEditorScreen
            initialTags={ route.currentTags }
            recentTags={ allTags }
            onSelect={ (tags) => {
              route.onSelect(tags);
              navigator.pop();
            } }
          />
        );
    }
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('main', () => QuickTick);
