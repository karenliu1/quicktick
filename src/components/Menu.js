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
      <View style={ styles.container }>
        { menuIconEl }
        <View style={ styles.menu }>
          { this.renderRow(Constants.SCREENS.CLOCK, 'Clock') }
          { this.renderRow(Constants.SCREENS.HISTORY, 'Log') }
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
  menu: {
    marginTop: Constants.GUTTER_LG + Constants.MENU_SIZE + Constants.GUTTER_MD,
    marginBottom: Constants.GUTTER_LG,
    marginHorizontal: Constants.GUTTER_LG,
  },
  menuTouchable: {
    backgroundColor: 'white',
    position: 'absolute',
    top: Constants.GUTTER_MD,
    left: Constants.GUTTER_LG,
    right: Constants.GUTTER_LG,
  },
  menuIcon: {
    width: Constants.MENU_SIZE,
    resizeMode: 'contain',
  },
  row: {
    padding: Constants.GUTTER_MD,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.COLOR_GRAY,
    flexDirection: 'column',
  },
});
