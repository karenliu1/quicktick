import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import Button from './Button';
import SectionText from './SectionText';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { formatRange, formatTime, formatTotal } from '../Utilities';

export default class ClockScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    lastSession: SessionPropType,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    onClockIn: PropTypes.func.isRequired,
    onClockOut: PropTypes.func.isRequired,
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

  renderClockIn() {
    let { lastSession } = this.props;
    let lastSessionEl;
    if (lastSession) {
      lastSessionEl = (
        <SectionText
          style={ Constants.STYLES.section }
          titleText="Last Session"
          sectionText={ formatRange(lastSession.startTime, lastSession.endTime) }
          onEdit={ () => {
            this.props.navigator.push({
              name: Constants.SCREENS.DETAIL,
              session: lastSession,
            });
          } }
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
          <Button type="primary" text="Clock In" onPress={ this.props.onClockIn } />
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
          titleText="Clocked In"
          sectionText={ formatTime(this.props.startTime) }
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
          <Button type="warning" text="Clock Out" onPress={ this.props.onClockOut } />
        </View>
      </View>
    );
  }

  render() {
    return this.props.startTime ? this.renderClockOut() : this.renderClockIn();
  }
}
