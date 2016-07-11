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
    navigator: PropTypes.object,
    navState: PropTypes.object,
    isExpanded: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  };

  onNavigateTo(screen) {
    const { navigator } = this.props;
    this.props.onToggle();

    const routes = navigator.getCurrentRoutes();
    const currentRoute = routes[routes.length - 1];

    if (currentRoute.name !== screen) {
      navigator.push({ name: screen });
    }
  }

  renderRow(screen, label, icon) {
    return (
      <TouchableOpacity
        onPress={ () => this.onNavigateTo(screen) }
        style={ styles.row }>
        <Image
          source={ icon }
          style={ [Constants.STYLES.icon, styles.rowIcon] }
        />
        <Text style={ Constants.STYLES.text }>{ label }</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const menuIconEl = (
      <TouchableOpacity style={ styles.menuTouchable }
        onPress={ this.props.onToggle }>
        <Image style={ styles.menuIcon }
          source={ Constants.IMG_DARKGRAY_MENU }
        />
      </TouchableOpacity>
    );

    if (!this.props.isExpanded) {
      return menuIconEl;
    }

    return (
      <View style={ styles.container }>
        { menuIconEl }
        <View style={ styles.menu }>
          { this.renderRow(Constants.SCREENS.CLOCK, 'Clock', Constants.IMG_DARKGRAY_CLOCK) }
          { this.renderRow(Constants.SCREENS.HISTORY, 'Log', Constants.IMG_DARKGRAY_HISTORY) }
          { this.renderRow(Constants.SCREENS.TOTALS, 'Analyze', Constants.IMG_DARKGRAY_GRAPH) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuTouchable: {
    position: 'absolute',
    justifyContent: 'center',
    top: Constants.GUTTER_LG,
    left: Constants.GUTTER_LG,
    right: Constants.GUTTER_LG,
    height: Constants.MENU_TOTAL_HEIGHT - Constants.GUTTER_LG,
  },
  menuIcon: {
    width: Constants.MENU_SIZE,
    height: Constants.MENU_SIZE,
    resizeMode: 'contain',
  },
  menu: {
    marginTop: Constants.MENU_TOTAL_HEIGHT,
    marginBottom: Constants.GUTTER_MD,
    marginHorizontal: Constants.GUTTER_LG,
  },
  row: {
    padding: Constants.GUTTER_MD,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: Constants.GUTTER_MD,
  },
});
