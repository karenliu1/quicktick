import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { formatDateTime, formatTotalFromDuration } from '../Utilities';

import SectionText from './SectionText';

export default class TotalsScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    sessions: PropTypes.arrayOf(SessionPropType).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      startTime: moment().startOf('week').toDate(),
      endTime: new Date(),
      filter: null,
    };
  }

  onChangeStartTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.startTime,
      onSave: (time) => {
        this.setState({ startTime: new Date(time) });
      },
    });
  }

  onChangeEndTime = () => {
    this.props.navigator.push({
      name: Constants.SCREENS.DATE_PICKER,
      initialTime: this.state.endTime,
      onSave: (time) => this.setState({ endTime: new Date(time) }),
    });
  }

  render() {
    const filteredSessions = this.props.sessions.filter((session) => (
      session.startTime >= this.state.startTime &&
        session.endTime <= this.state.endTime
    ));

    const total = filteredSessions.reduce((currentTotal, session) => {
      const elapsedMs = moment(session.endTime).diff(moment(session.startTime));
      return currentTotal.add(elapsedMs);
    }, moment.duration(0));

    return (
      <View style={ Constants.STYLES.screen }>
        <View style={ Constants.STYLES.section }>
          <SectionText
            titleText="From"
            sectionText={ formatDateTime(this.state.startTime) }
            onEdit={ this.onChangeStartTime }
            style={ styles.section }
          />
          <SectionText
            titleText="To"
            sectionText={ formatDateTime(this.state.endTime) }
            onEdit={ this.onChangeEndTime }
            style={ styles.section }
          />
          <SectionText
            isLarge
            titleText="Total Time"
            sectionText={ formatTotalFromDuration(total) }
            style={ styles.section }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Constants.GUTTER_MD,
  },
});
