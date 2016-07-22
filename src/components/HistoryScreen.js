import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { formatDate, formatRange } from '../Utilities';

import TagList from './TagList';

export default class HistoryScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    sessions: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  onNavigateToClock = () => {
    this.props.navigator.push({ name: Constants.SCREENS.CLOCK });
  };

  renderSectionHeader = (session) => {
    return (
      <View style={ styles.sectionHeader }>
        <Image source={ Constants.IMG_YELLOW_SUN }
          style={ Constants.STYLES.icon }
        />
        <Text style={ [Constants.STYLES.text, styles.sectionHeaderText] }>
          { formatDate(session[0].startTime) }
        </Text>
      </View>
    );
  };

  renderNotes(session) {
    if (session.notes) {
      return (
        <Text style={ Constants.STYLES.text } numberOfLines={ 1 }>
          { session.notes }
        </Text>
      );
    }

    return (
      <Text
        style={ Constants.STYLES.emptyPlaceholder }
        numberOfLines={ 1 }>
        No notes.
      </Text>
    );
  }

  renderRow = (session) => {
    return (
      <TouchableOpacity
        onPress={ () => this.props.onEdit(session) }
        style={ styles.row }>
        <View style={ styles.rowText }>
          <Text style={ Constants.STYLES.text }>
            { formatRange(session.startTime, session.endTime) }
          </Text>
          { this.renderNotes(session) }
          { session.tags.length > 0 && <TagList tags={ session.tags } /> }
        </View>
      </TouchableOpacity>
    );
  };

  convertRowsToMap() {
    let sessionMap = {};

    let sessions = this.props.sessions;
    // if (this.state.filter) {
    //   sessions = sessions.filter((session) => {
    //     const filterStr = this.state.filter.toLowerCase();
    //     if (session.notes && session.notes.toLowerCase().includes(filterStr)) {
    //       return true;
    //     }
    //     const matchedTags = session.tags.filter((tag) => (
    //       tag.toLowerCase().includes(filterStr)
    //     ));
    //     return matchedTags.length > 0;
    //   });
    // }

    // Map dates to sessions that begin on that date
    sessions.forEach((session) => {
      const key = moment(session.startTime).format('MMM D YY');
      if (!sessionMap[key]) { sessionMap[key] = []; }
      sessionMap[key].push(session);
    });

    // Sort each list by reverse chronological order
    for (let key in sessionMap) {
      sessionMap[key].sort((s1, s2) => s2.startTime - s1.startTime);
    }

    return sessionMap;
  }

  renderEmptyState() {
    return (
      <View style={ Constants.STYLES.screen }>
        <View style={ [Constants.STYLES.section, styles.emptyState] }>
          <Text style={ Constants.STYLES.text }>
            There are no sessions.
          </Text>
          <TouchableOpacity onPress={ this.onNavigateToClock }>
            <Text style={ Constants.STYLES.linkText }>
              Start a Session
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const datasource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const rows = datasource.cloneWithRowsAndSections(this.convertRowsToMap());

    if (this.props.sessions.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <View style={ [Constants.STYLES.screen, Constants.STYLES.screenReducedPadding] }>
        <ListView dataSource={ rows }
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    paddingVertical: Constants.GUTTER_MD,

    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderText: {
    flex: 1,
    fontSize: Constants.FONT_SIZE_LG,
    paddingLeft: Constants.GUTTER_SM,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    paddingVertical: Constants.GUTTER_MD,

    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
  },
});
