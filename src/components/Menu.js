import React, { Component, PropTypes } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';

export default class Menu extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    navState: PropTypes.object,
  };

  onNavigateTo(screen) {
    const { navigator } = this.props;

    const routes = navigator.getCurrentRoutes();
    const currentRoute = routes[routes.length - 1];

    if (currentRoute.name !== screen) {
      navigator.push({ name: screen });
    }
  }

  renderMenuItem(route, label, icon) {
    return <TouchableOpacity
      onPress={ () => this.onNavigateTo(route) }
      style={ styles.menuItem }>
      <Image
        source={ icon }
        style={ Constants.STYLES.icon }
      />
      <Text style={ [Constants.STYLES.text, styles.menuItemLabel] }>{ label }</Text>
    </TouchableOpacity>;
  }

  render() {
    return <View style={ styles.container }>
      { this.renderMenuItem(Constants.SCREENS.HISTORY, 'Log', Constants.IMG_DARKGRAY_HISTORY) }
      { this.renderMenuItem(Constants.SCREENS.CLOCK, 'Clock', Constants.IMG_DARKGRAY_CLOCK) }
      { this.renderMenuItem(Constants.SCREENS.TOTALS, 'Analyze', Constants.IMG_DARKGRAY_GRAPH) }
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_DARK_GRAY,
    flexDirection: 'row',
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Constants.GUTTER_MD,
  },
  menuItemLabel: {
    fontSize: Constants.FONT_SIZE_SM,
    marginBottom: Constants.GUTTER_MD,
  },
});
