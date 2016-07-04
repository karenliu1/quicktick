import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './Button';
import TitleText from './TitleText';

import * as Constants from '../Constants';
import { formatTime } from '../Utilities';

export default class ClockInScreen extends Component {
  static propTypes = {
    lastSessionStart: PropTypes.string,
    lastSessionEnd: PropTypes.string,
    currentTime: PropTypes.string.isRequired,
    onClockIn: PropTypes.func.isRequired,
  };

  render() {
    const { currentTime, lastSessionStart, lastSessionEnd } = this.props;
    const formattedTime = formatTime(currentTime);

    let lastSessionEl;
    if (lastSessionStart && lastSessionEnd) {
      const start = formatTime(lastSessionStart);
      const end = formatTime(lastSessionEnd);
      lastSessionEl = (
        <View style={ styles.section }>
          <TitleText text="Last Session" />
          <Text style={ Constants.STYLES.text }>
            { start } — { end }
          </Text>
        </View>
      );
    }

    return (
      <View style={ styles.container }>
        { lastSessionEl }
        <View style={ styles.section }>
          <TitleText text="Current Time" />
          <Text style={ [Constants.STYLES.text, styles.largeText] }>
            { formattedTime }
          </Text>
        </View>
        <View style={ styles.section }>
          <Button type="start" text="Clock In" onPress={ this.props.onClockIn } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Constants.GUTTER_LG,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  largeText: {
    fontSize: Constants.FONT_SIZE_LG,
  },
});
