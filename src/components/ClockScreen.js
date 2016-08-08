import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from './Button';
import SectionText from './SectionText';
import Tag from './Tag';

import * as Constants from '../Constants';
import { SessionPropType } from '../PropTypes';
import { createSession } from '../actions/sessions';
import { formatRange, formatTime, formatTotal } from '../Utilities';

const MAX_RECENT_TAGS = 5;

class ClockScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    allTags: PropTypes.array.isRequired,
    lastSession: SessionPropType,
  };

  state = {
    startTime: null,
    currentTime: null,
    tags: new Set(),
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
    this.props.dispatch(createSession(
      this.state.startTime, new Date(), Array.from(this.state.tags)));
    this.setState({ startTime: null, tags: new Set() });
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
          sectionText={ formatTime(this.state.currentTime) }
        />

        { this.renderRecentTags() }

        <View style={ Constants.STYLES.section }>
          <Button type="primary" text="Clock In" onPress={ this.onClockIn } />
        </View>
      </View>
    );
  }

  renderRecentTags() {
    if (this.props.allTags.length === 0) { return null; }

    return <SectionText
      titleText="Add Recent Tags"
      style={ Constants.STYLES.section }>
      <View style={ styles.tagContainer }>
        { this.props.allTags.slice(0, MAX_RECENT_TAGS).map((tag) => (
          <Tag
            tag={ tag } key={ tag }
            isHighlighted={ this.state.tags.has(tag) }
            onPress={() => {
              const tags = this.state.tags;
              tags.has(tag) ? tags.delete(tag) : tags.add(tag);
              this.setState({ tags });
            }}
          />
        )) }
      </View>
    </SectionText>;
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

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => {
  const sessions = state.sessions;

  let allTags = [];
  sessions.forEach((session) => allTags = allTags.concat(session.tags));

  return {
    allTags: Array.from(new Set(allTags)),
    lastSession: sessions && sessions.length > 0 ? sessions[0] : null,
  };
};

export default connect(mapStateToProps)(ClockScreen);
