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

export default class ClockScreen extends Component {
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    onClockIn: PropTypes.func.isRequired,
    onClockOut: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    currentTime: null,
    notes: null,
  };

  componentDidMount() {
    // TODO: Refresh current time periodically
    this.setState({ currentTime: new Date().toISOString() });
  }

  onChangeNotes = (notes) => this.setState({ notes });
  onConfirm = () => {
    console.log('notes are', this.state.notes);
    this.props.onConfirm(this.state.notes);
  }

  renderClockIn() {
    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText isLarge
          titleText="Now"
          sectionText={ formatTime(this.state.currentTime) } />
        <View style={ Constants.STYLES.section }>
          <Button type="start" text="Clock In" onPress={ this.props.onClockIn } />
        </View>
      </View>
    );
  }

  renderClockOut() {
    const elapsedDisplay = getElapsedDisplay(this.props.startTime, this.state.currentTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText isLarge
          titleText="Total Time"
          sectionText={ elapsedDisplay } />
        <SectionText isLarge
          titleText="Clocked In"
          sectionText={ formatTime(this.props.startTime) }
        />
        <View style={ Constants.STYLES.section }>
          <Button type="stop" text="Clock Out" onPress={ this.props.onClockOut } />
          <Button type="cancel" text="Cancel" onPress={ this.props.onCancel } />
        </View>
      </View>
    );
  }

  renderConfirm() {
    const elapsedDisplay = getElapsedDisplay(
      this.props.startTime, this.state.currentTime);
    const startTime = formatTime(this.props.startTime);
    const endTime = formatTime(this.props.endTime);

    return (
      <View style={ Constants.STYLES.screen }>
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
            onChangeText={ this.onChangeNotes }
          />
        </View>
        <View style={ Constants.STYLES.section }>
          <Button type="start" text="Done" onPress={ this.onConfirm } />
          <Button type="cancel" text="Cancel" onPress={ this.props.onCancel } />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.startTime && this.props.endTime) {
      return this.renderConfirm();
    }
    if (this.props.startTime) {
      return this.renderClockOut();
    }
    return this.renderClockIn();
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
