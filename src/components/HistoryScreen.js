import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { formatDate, formatRange } from '../Utilities';

export default class HistoryScreen extends Component {
  static propTypes = {
    sessions: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  renderSectionHeader = (session) => {
    return (
      <View style={ styles.sectionHeader }>
        <Image source={ Constants.IMG_SUN }
          style={ Constants.STYLES.icon }
        />
        <Text style={ [Constants.STYLES.text, styles.sectionHeaderText] }>
          { formatDate(session[0].startTime) }
        </Text>
      </View>
    );
  };

  renderRow = (session) => {
    return (
      <View style={ styles.row }>
        <View style={ styles.rowText }>
          <Text style={ Constants.STYLES.text }>
            { formatRange(session.startTime, session.endTime) }
          </Text>
          <Text style={ Constants.STYLES.text } numberOfLines={ 1 }>
            { session.notes }
          </Text>
        </View>
        <TouchableOpacity onPress={ () => this.props.onEdit(session) }>
          <Image
            style={ [Constants.STYLES.icon, styles.icon] }
            source={ Constants.IMG_EDIT }
          />
        </TouchableOpacity>
        <Image
          style={ [Constants.STYLES.icon, styles.icon] }
          source={ Constants.IMG_DELETE }
        />
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
      <View style={ Constants.STYLES.screen }>
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
  icon: {
    marginLeft: Constants.GUTTER_SM,
  },
});
