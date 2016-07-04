import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from './Button';
import SectionText from './SectionText';

import * as Constants from '../Constants';
import { formatTime, getElapsedDisplay } from '../Utilities';

export default class ClockOutScreen extends Component {
  static propTypes = {
    startTime: PropTypes.string.isRequired,
    currentTime: PropTypes.string.isRequired,
    onClockOut: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const elapsedDisplay = getElapsedDisplay(this.props.startTime, this.props.currentTime);

    return (
      <View style={ styles.container }>
        <SectionText isLarge
          titleText="Total Time"
          sectionText={ elapsedDisplay } />
        <SectionText isLarge
          titleText="Clocked In"
          sectionText={ formatTime(this.props.startTime) }
        />
        <SectionText isLarge
          titleText="Current Time"
          sectionText={ formatTime(this.props.currentTime) }
        />
        <View style={ Constants.STYLES.section }>
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
});
