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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as Constants from '../Constants';
import { formatDate, formatRange } from '../Utilities';

import TagList from './TagList';

class HistoryScreen extends Component {
  static propTypes = {
    sessions: PropTypes.array.isRequired,
  };

  state = {
    searchText: '',
  };

  renderSectionHeader = (session) => {
    return (
      <View style={ styles.sectionHeader }>
        <Image source={ Constants.IMG_SUN }
          style={ [Constants.STYLES.icon, styles.sectionHeaderIcon] }
        />
        <Text style={ [Constants.STYLES.text, styles.sectionHeaderText] }>
          { formatDate(session[0].startTime) }
        </Text>
      </View>
    );
  };

  renderNotes(session) {
    if (!session.notes) { return null; }
    return (
      <Text style={ Constants.STYLES.text } numberOfLines={ 1 }>
        { session.notes }
      </Text>
    );
  }

  renderRow = (session) => {
    return (
      <TouchableOpacity
        onPress={ () => Actions.detailScreen({ initialSession: session }) }
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
    if (this.state.searchText) {
      sessions = sessions.filter((session) => {
        const filterStr = this.state.searchText.toLowerCase();
        if (session.notes && session.notes.toLowerCase().includes(filterStr)) {
          return true;
        }
        const matchedTags = session.tags.filter((tag) => (
          tag.toLowerCase().includes(filterStr)
        ));
        return matchedTags.length > 0;
      });
    }

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

  onChangeSearch = (searchText) => this.setState({ searchText });

  renderEmptyState() {
    return (
      <View style={ Constants.STYLES.screen }>
        <View style={ [Constants.STYLES.section, styles.emptyState] }>
          <Text style={ Constants.STYLES.text }>
            There are no sessions.
          </Text>
          <TouchableOpacity onPress={ Actions.clockTab }>
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
        <TextInput
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={ this.onChangeSearch }
          placeholder="Search…"
          returnKeyType="search"
          style={ styles.searchInput }
        />
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
    paddingVertical: Constants.GUTTER_SM,

    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderIcon: {
    tintColor: Constants.COLOR_YELLOW,
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
  searchInput: {
    height: 40,
    borderColor: Constants.COLOR_GRAY,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Constants.GUTTER_SM,
    marginTop: Constants.GUTTER_SM,
  },
});

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions,
  };
};

export default connect(mapStateToProps)(HistoryScreen);
