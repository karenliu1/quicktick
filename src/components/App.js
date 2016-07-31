/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Image,
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import * as Constants from '../Constants';

import ClockScreen from './ClockScreen';
import DatePickerScreen from './DatePickerScreen';
import DetailScreen from './DetailScreen';
import HistoryScreen from './HistoryScreen';
import TabBarIcon from './TabBarIcon';
import TagEditorScreen from './TagEditorScreen';
import TotalsScreen from './TotalsScreen';

export default class App extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs
          tabBarStyle={ styles.tabBar }>
          <Scene
            key="historyTab"
            icon={ TabBarIcon }
            iconUrl={ Constants.IMG_DARKGRAY_HISTORY }
            title="Log">
            <Scene key="historyScreen" component={ HistoryScreen } hideNavBar />
            <Scene key="detailScreen" component={ DetailScreen }  hideNavBar />
            <Scene key="tagEditorScreen" component={ TagEditorScreen } hideNavBar />
          </Scene>
          <Scene
            key="clockTab"
            icon={ TabBarIcon }
            iconUrl={ Constants.IMG_DARKGRAY_CLOCK }
            title="Clock"
            component={ ClockScreen }
            hideNavBar initial
          />
          <Scene
            key="analyzeTab"
            icon={ TabBarIcon }
            iconUrl={ Constants.IMG_DARKGRAY_GRAPH }
            title="Analyze">
            <Scene key="analyzeScreen" component={ TotalsScreen } hideNavBar />
          </Scene>
        </Scene>
        <Scene key="datePickerScreen" component={ DatePickerScreen } hideNavBar />
      </Scene>
    </Router>;
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: Constants.TABBAR_SIZE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
  },
});
