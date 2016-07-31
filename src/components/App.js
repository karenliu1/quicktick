/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
import TagEditorScreen from './TagEditorScreen';
import TotalsScreen from './TotalsScreen';

class ClockIcon extends Component {
  render() {
    return <View>
      <Image
        source={ Constants.IMG_DARKGRAY_CLOCK }
        style={ Constants.STYLES.icon }
      />
      <Text>Clock</Text>
    </View>;
  }
}

class HistoryIcon extends Component {
  render() {
    return <View>
      <Image
        source={ Constants.IMG_DARKGRAY_HISTORY }
        style={ Constants.STYLES.icon }
      />
      <Text>Log</Text>
    </View>;
  }
}

class AnalyzeIcon extends Component {
  render() {
    return <View>
      <Image
        source={ Constants.IMG_DARKGRAY_GRAPH }
        style={ Constants.STYLES.icon }
      />
      <Text>Analyze</Text>
    </View>;
  }
}

export default class App extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs
          tabBarSelectedItemStyle={ styles.tabBarSelectedItemStyle }>
          <Scene key="clockTab" icon={ ClockIcon } component={ ClockScreen } hideNavBar />
          <Scene key="historyTab" icon={ HistoryIcon }>
            <Scene key="historyScreen" component={ HistoryScreen } hideNavBar />
            <Scene key="detailScreen" component={ DetailScreen }  hideNavBar />
            <Scene key="tagEditorScreen" component={ TagEditorScreen } hideNavBar />
          </Scene>
          <Scene key="analyzeTab" icon={ AnalyzeIcon }>
            <Scene key="analyzeScreen" component={ TotalsScreen } hideNavBar />
          </Scene>
        </Scene>
        <Scene key="datePickerScreen" component={ DatePickerScreen } hideNavBar />
      </Scene>
    </Router>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 25, // status bar :(
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ccc',
  },
});
