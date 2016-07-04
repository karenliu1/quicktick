import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Button from './Button';
import SectionText from './SectionText';
import TitleText from './TitleText';

import * as Constants from '../Constants';
import { formatTime, getElapsedDisplay } from '../Utilities';

export default class ConfirmScreen extends Component {
  static propTypes = {
    clockedInTime: PropTypes.string.isRequired,
    clockedOutTime: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const elapsedDisplay = getElapsedDisplay(
      this.props.clockedInTime, this.props.currentTime);
    const startTime = formatTime(this.props.clockedInTime);
    const endTime = formatTime(this.props.clockedOutTime);

    return (
      <View style={ styles.container }>
        <SectionText
          titleText="Session"
          sectionText={ `${startTime} — ${endTime}` }
        />
        <SectionText isLarge
          titleText="Total Time"
          sectionText={ elapsedDisplay }
        />
        <View style={ Constants.STYLES.section }>
          <TitleText text="Notes" />
          <TextInput
            autoFocus
            multiline
            style={ [Constants.STYLES.input, styles.input] }
          />
        </View>
        <View style={ Constants.STYLES.section }>
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
  input: {
    flex: 1,
  },
});
