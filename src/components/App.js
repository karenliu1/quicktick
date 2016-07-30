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
import { connect } from 'react-redux';

import * as Constants from '../Constants';
import Storage from '../Storage';
import { editSession, deleteSession } from '../actions/sessions';

import ClockScreen from './ClockScreen';
import DatePickerScreen from './DatePickerScreen';
import DetailScreen from './DetailScreen';
import HistoryScreen from './HistoryScreen';
import Menu from './Menu';
import TagEditorScreen from './TagEditorScreen';
import TotalsScreen from './TotalsScreen';

class App extends Component {
  onEditCancel(navigator) {
    navigator.pop();
  }

  async onEditSave(navigator, session) {
    this.props.dispatch(editSession(session));
  }

  async onEditDelete(navigator, session) {
    this.props.dispatch(deleteSession(session));
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
    const sessions = this.props.sessions;
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
            sessions={ this.props.sessions }
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
        return <TotalsScreen navigator={ navigator } sessions={ this.props.sessions } />;
      case Constants.SCREENS.TAG_EDITOR:
        let allTags = this.props.sessions.reduce((tagsSoFar, session) => (
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

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions,
  };
};

export default connect(mapStateToProps)(App);
