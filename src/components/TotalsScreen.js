import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { formatDateTime, formatTotalFromDuration } from '../Utilities';

import SectionText from './SectionText';

class TotalsScreen extends Component {
  static propTypes = {
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
    Actions.analyzeDatePickerScreen({
      initialTime: this.state.startTime,
      onSave: (time) => {
        this.setState({ startTime: new Date(time) });
      },
    });
  }

  onChangeEndTime = () => {
    Actions.analyzeDatePickerScreen({
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

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions,
  };
};

export default connect(mapStateToProps)(TotalsScreen);
