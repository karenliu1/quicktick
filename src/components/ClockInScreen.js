import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './Button';
import SectionText from './SectionText';

import * as Constants from '../Constants';
import { formatTime } from '../Utilities';

export default class ClockInScreen extends Component {
  static propTypes = {
    prevStartTime: PropTypes.string,
    prevEndTime: PropTypes.string,
    currentTime: PropTypes.string.isRequired,
    onClockIn: PropTypes.func.isRequired,
  };

  render() {
    const { currentTime, prevStartTime, prevEndTime } = this.props;
    const formattedTime = formatTime(currentTime);

    let prevEl;
    if (prevStartTime && prevEndTime) {
      const start = formatTime(prevStartTime);
      const end = formatTime(prevEndTime);
      prevEl = <SectionText titleText="Last Session"
        sectionText={ `${start} — ${end}` }
      />;
    }

    return (
      <View style={ Constants.STYLES.screen }>
        { prevEl }
        <SectionText isLarge
          titleText="Now"
          sectionText={ formattedTime } />
        <View style={ Constants.STYLES.section }>
          <Button type="start" text="Clock In" onPress={ this.props.onClockIn } />
        </View>
      </View>
    );
  }
}
