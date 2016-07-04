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

export default class ConfirmScreen extends Component {
  static propTypes = {
    clockedInTime: PropTypes.string.isRequired,
    clockedOutTime: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const elapsedDuration = moment.duration(
      moment(this.props.clockedOutTime).diff(moment(this.props.clockedInTime)));
    const elapsedHours = elapsedDuration.hours();
    const elapsedMinutes = elapsedDuration.minutes();

    return (
      <View style={ styles.container }>
        <View style={ styles.section }>
          <TitleText text="Total Time" />
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
          <TitleText text="Clocked Out" />
          <Text style={ [Constants.STYLES.text, styles.largeText] }>
            { formatTime(this.props.clockedOutTime) }
          </Text>
        </View>

        <View style={ styles.section }>
          <Button type="start" text="Done" onPress={ this.props.onConfirm } />
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
