import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Constants from '../Constants';
import { formatDate, formatRange, formatTotal } from '../Utilities';

import SectionText from './SectionText';

export default class DetailScreen extends Component {
  static propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    notes: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const date = formatDate(this.props.startTime);
    const total = formatTotal(this.props.startTime, this.props.endTime);
    const range = formatRange(this.props.startTime, this.props.endTime);

    return (
      <View style={ Constants.STYLES.screen }>
        <ScrollView>
          <View style={ styles.title }>
            <Text style={ [Constants.STYLES.text, styles.date] }>
              { date }
            </Text>
            <Text style={ [Constants.STYLES.text, styles.range] }>
              { range }
            </Text>
          </View>
          <SectionText
            titleText="Total Time" sectionText={ total }
            style={ styles.section }
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: Constants.GUTTER_MD,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    marginTop: Constants.GUTTER_MD,
    paddingBottom: Constants.GUTTER_MD,
  },
  date: {
    fontSize: Constants.FONT_SIZE_LG,
    marginRight: Constants.GUTTER_MD,
  },
  range: {
    flex: 1,
  },
});
