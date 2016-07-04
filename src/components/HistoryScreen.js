import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { formatTime } from '../Utilities';

export default class HistoryScreen extends Component {
  static propTypes = {
    sessions: PropTypes.array.isRequired,
  };

  renderSectionHeader = (session) => {
    const date = moment(session.startTime).format('MMM D');
    return (
      <View style={ styles.sectionHeader }>
        <Text style={ [Constants.STYLES.text, styles.sectionHeaderText] }>
          { date }
        </Text>
      </View>
    );
  };

  renderRow = (session) => {
    return (
      <View style={ styles.row }>
        <Text style={ Constants.STYLES.text }>
          { `${formatTime(session.startTime)} — ${formatTime(session.endTime)}` }
        </Text>
        <Text style={ Constants.STYLES.text }>
          { session.notes }
        </Text>
      </View>
    );
  };

  convertRowsToMap() {
    let sessionMap = {}; // key is the date, value is all sessions within that date
    this.props.sessions.forEach((session) => {
      const key = moment(session.startTime).format('MMM D YY');
      if (!sessionMap[key]) { sessionMap[key] = []; }
      sessionMap[key].push(session);
    });
    return sessionMap;
  }

  render() {
    const datasource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const rows = datasource.cloneWithRowsAndSections(this.convertRowsToMap());
    return (
      <View>
        <ListView dataSource={ datasource.cloneWithRows(this.props.sessions) }
          renderSectionHeader={ this.renderSectionHeader }
          renderRow={ this.renderRow }
          enableEmptySections
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Constants.COLOR_GRAY,
    marginHorizontal: Constants.GUTTER_LG,
    paddingVertical: Constants.GUTTER_MD,
  },
  sectionHeaderText: {
    fontSize: Constants.FONT_SIZE_LG,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: Constants.COLOR_GRAY,
    marginHorizontal: Constants.GUTTER_LG,
    paddingVertical: Constants.GUTTER_MD,
  },
});
