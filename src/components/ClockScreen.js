import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import Button from './Button';
import SectionText from './SectionText';
import TitleText from './TitleText';

import * as Constants from '../Constants';
import { formatRange, formatTime, formatTotal } from '../Utilities';

export default class ClockScreen extends Component {
  static propTypes = {
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    onClockIn: PropTypes.func.isRequired,
    onClockOut: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    currentTime: null,
    notes: null,
  };

  updateTime = () => this.setState({ currentTime: new Date() });

  componentDidMount() {
    this.updateTime();
    this.updateInterval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  onChangeNotes = (notes) => this.setState({ notes });
  onConfirm = () => this.props.onConfirm(this.state.notes);

  renderClockIn() {
    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
          titleText="Now"
          sectionText={ formatTime(this.state.currentTime) } />
        <View style={ Constants.STYLES.section }>
          <Button type="start" text="Clock In" onPress={ this.props.onClockIn } />
        </View>
      </View>
    );
  }

  renderClockOut() {
    const total = formatTotal(this.props.startTime, this.state.currentTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
          titleText="Total Time"
          sectionText={ total } />
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
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
    const total = formatTotal(this.props.startTime, this.props.endTime);
    const range = formatRange(this.props.startTime, this.props.endTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText
          style={ Constants.STYLES.section }
          titleText="Session"
          sectionText={ range }
        />
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
          titleText="Total Time"
          sectionText={ total }
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
