/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Navigator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import Storage from '../Storage';
import ClockScreen from './ClockScreen';
import DatePickerScreen from './DatePickerScreen';
import DetailScreen from './DetailScreen';
import HistoryScreen from './HistoryScreen';
import Menu from './Menu';
import TagEditorScreen from './TagEditorScreen';
import TotalsScreen from './TotalsScreen';

export default class App extends Component {
  state = {
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

  onEditCancel(navigator) {
    navigator.pop();
  }

  async onEditSave(navigator, session) {
    // Optimistically update
    const sessionIndex = this.state.sessions.findIndex((s) => s.id === session.id);
    this.setState({
      sessions: [
        ...this.state.sessions.slice(0, sessionIndex),
        session,
        ...this.state.sessions.slice(sessionIndex + 1)
      ],
    });

    try {
      await Storage.editSession(session);
    } catch (error) {
      // TODO: Display this error
      throw error;
    }
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
    return <Navigator
      style={ styles.container }
      initialRoute={{ name: Constants.SCREENS.CLOCK }}
      navigationBar={ <Menu /> }
      renderScene={(route, navigator) => (
        this.renderScreen(route, navigator)
      )}
    />;
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
        let allTags = this.state.sessions.reduce((tagsSoFar, session) => (
          tagsSoFar.concat(session.tags || [])
        ), []);
        allTags = Array.from(new Set(allTags))

        return (
          <TagEditorScreen
            initialTags={ route.currentTags }
            allTags={ allTags }
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
  container: {
    flex: 1,
    top: 25, // status bar :(
  },
});
