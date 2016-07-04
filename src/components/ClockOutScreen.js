import moment from 'moment';
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

export default class ClockOutScreen extends Component {
  static propTypes = {
    clockedInTime: PropTypes.string.isRequired,
    currentTime: PropTypes.string.isRequired,
    onClockOut: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const elapsedDuration = moment.duration(
      moment(this.props.currentTime).diff(moment(this.props.clockedInTime)));
    const elapsedHours = elapsedDuration.hours();
    const elapsedMinutes = elapsedDuration.minutes();

    return (
      <View style={ styles.container }>
        <View style={ styles.section }>
          <TitleText text="Elapsed Time" />
          <Text style={ [Constants.STYLES.text, styles.largeText] }>
            { `${elapsedHours}hr ${elapsedMinutes}m` }
          </Text>
        </View>

        <View style={ styles.section }>
          <TitleText text="Clocked In" />
          <Text style={ [Constants.STYLES.text, styles.largeText] }>
            { formatTime(this.props.clockedInTime) }
          </Text>
        </View>

        <View style={ styles.section }>
          <TitleText text="Current Time" />
          <Text style={ [Constants.STYLES.text, styles.largeText] }>
            { formatTime(this.props.currentTime) }
          </Text>
        </View>

        <View style={ styles.section }>
          <Button type="stop" text="Clock Out" onPress={ this.props.onClockOut } />
          <Button type="cancel" text="Cancel" onPress={ this.props.onCancel } />
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
