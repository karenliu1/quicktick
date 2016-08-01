import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from './Button';
import SectionText from './SectionText';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { createSession } from '../actions/sessions';
import { formatRange, formatTime, formatTotal } from '../Utilities';

class ClockScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    lastSession: SessionPropType,
  };

  state = {
    startTime: null,
    currentTime: null,
  };

  updateTime = () => this.setState({ currentTime: new Date() });

  componentDidMount() {
    this.updateTime();
    this.updateInterval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  onClockIn = () => this.setState({ startTime: new Date() });

  onClockOut = () => {
    this.props.dispatch(createSession(this.state.startTime, new Date()));
    this.setState({ startTime: null });
  }

  renderClockIn() {
    let { lastSession } = this.props;
    let lastSessionEl;
    if (lastSession) {
      lastSessionEl = (
        <SectionText
          style={ Constants.STYLES.section }
          titleText="Last Session"
          sectionText={ formatRange(lastSession.startTime, lastSession.endTime) }
          onEdit={() => {
            Actions.historyTab();
            Actions.detailScreen({ initialSession: lastSession });
          }}
        />
      );
    }
    return (
      <View style={ Constants.STYLES.screen }>
        { lastSessionEl }
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
          titleText="Now"
          sectionText={ formatTime(this.state.currentTime) } />
        <View style={ Constants.STYLES.section }>
          <Button type="primary" text="Clock In" onPress={ this.onClockIn } />
        </View>
      </View>
    );
  }

  renderClockOut() {
    const total = formatTotal(this.state.startTime, this.state.currentTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <SectionText
          isLarge
          style={ Constants.STYLES.section }
          titleText="Clocked In"
          sectionText={ formatTime(this.state.startTime) }
        />
        <SectionText
          color={ Constants.COLOR_DARK_GREEN }
          isLarge
          sectionText={ formatTime(this.state.currentTime) }
          style={ Constants.STYLES.section }
          titleText="Now"
        />
        <SectionText
          style={ Constants.STYLES.section }
          titleText="Total Time"
          sectionText={ total } />
        <View style={ Constants.STYLES.section }>
          <Button type="warning" text="Clock Out" onPress={ this.onClockOut } />
        </View>
      </View>
    );
  }

  render() {
    return this.state.startTime ? this.renderClockOut() : this.renderClockIn();
  }
}

const mapStateToProps = (state) => {
  const sessions = state.sessions;
  return {
    lastSession: sessions && sessions.length > 0 ? sessions[0] : null,
  };
};

export default connect(mapStateToProps)(ClockScreen);
