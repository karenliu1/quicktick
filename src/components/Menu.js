import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Constants from '../Constants';

export default class Menu extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    navState: React.PropTypes.object,
    isExpanded: React.PropTypes.bool,

    onToggle: React.PropTypes.func.isRequired,
  };

  onNavigateTo(screen) {
    const { navigator } = this.props;
    this.props.onToggle();

    const routes = navigator.getCurrentRoutes();
    const currentRoute = routes[routes.length - 1];

    // Special case: clock-in should route to the correct clock screen.
    // TODO: Can this be less complicated if clocking is just one screen?
    if (screen === Constants.SCREENS.CLOCK_IN) {
      const routeNames = routes.map((route) => route.name);
      const lastClockIn = routeNames.indexOf(Constants.SCREENS.CLOCK_IN);
      const lastClockOut = routeNames.indexOf(Constants.SCREENS.CLOCK_OUT);
      const lastConfirm = routeNames.indexOf(Constants.SCREENS.CONFIRM);
      const lastClockScreen = Math.max(Math.max(lastClockIn, lastClockOut), lastConfirm);
      return navigator.popToRoute(routes[lastClockScreen]);
    }

    if (currentRoute.name !== screen) {
      navigator.push({ name: screen });
    }
  }

  renderRow(screen, label) {
    return (
      <TouchableOpacity
        onPress={ () => this.onNavigateTo(screen) }
        style={ styles.row }>
        <Text style={ Constants.STYLES.text }>{ label }</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const menuIconEl = (
      <TouchableOpacity style={ styles.menuTouchable }
        onPress={ this.props.onToggle }>
        <Image style={ styles.menuIcon }
          source={ Constants.IMG_MENU }
        />
      </TouchableOpacity>
    );

    if (!this.props.isExpanded) {
      return menuIconEl;
    }

    return (
      <View style={ [Constants.STYLES.screen, styles.menu] }>
        { menuIconEl }
        { this.renderRow(Constants.SCREENS.CLOCK_IN, 'Clock') }
        { this.renderRow(Constants.SCREENS.HISTORY, 'Log') }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
  },
  menuTouchable: {
    position: 'absolute',
    top: Constants.GUTTER_LG / 2,
    right: Constants.GUTTER_LG / 2,
  },
  menuIcon: {
    width: Constants.GUTTER_LG,
    resizeMode: 'contain',
  },
  row: {
    padding: Constants.GUTTER_MD,
    borderBottomWidth: 1,
    borderColor: Constants.COLOR_GRAY,
  },
});
