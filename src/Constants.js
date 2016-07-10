/*global require*/

import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_MD = 20;
export const FONT_SIZE_LG = 30;
export const FONT_SIZE_XL = 50;

export const COLOR_GREEN = '#82C686';
export const COLOR_DARK_GREEN = '#519355';
export const COLOR_RED = '#ED7272';
export const COLOR_GRAY = '#B4B4B4';
export const COLOR_DARK_GRAY = '#4A4A4A';
export const COLOR_BLUE = '#54B6EE';

export const GUTTER_SM = 10;
export const GUTTER_MD = 20;
export const GUTTER_LG = 40;

export const IMG_DARKGRAY_CLOCK = require('../images/darkgray_clock.png');
export const IMG_DARKGRAY_GRAPH = require('../images/darkgray_graph.png');
export const IMG_DARKGRAY_HISTORY = require('../images/darkgray_history.png');
export const IMG_DARKGRAY_MENU = require('../images/darkgray_menu.png');
export const IMG_GRAY_ADD = require('../images/gray_add.png');
export const IMG_GRAY_EDIT = require('../images/gray_edit.png');
export const IMG_GRAY_SEARCH = require('../images/gray_search.png');
export const IMG_GRAY_X = require('../images/gray_x.png');
export const IMG_RED_DELETE = require('../images/red_delete.png');
export const IMG_WHITE_CIRCLE_X = require('../images/white_circle_x.png');
export const IMG_YELLOW_SUN = require('../images/yellow_sun.png');

export const MENU_SIZE = 30;
export const MENU_TOTAL_HEIGHT = MENU_SIZE + GUTTER_MD + GUTTER_LG;

export const STYLES = StyleSheet.create({
  text: {
    color: COLOR_DARK_GRAY,
    fontSize: FONT_SIZE_MD,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  input: {
    borderColor: COLOR_GRAY,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: FONT_SIZE_MD,
    padding: GUTTER_SM,
    height: FONT_SIZE_MD + GUTTER_SM * 2,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',

    marginHorizontal: GUTTER_LG,
    marginBottom: GUTTER_LG,
    marginTop: MENU_TOTAL_HEIGHT,
  },
  scrollableScreen: {
    flex: 1,

    // Use padding so scrollbar hits the edge
    paddingHorizontal: GUTTER_LG,

    marginBottom: GUTTER_LG,
    marginTop: MENU_TOTAL_HEIGHT,
  },
  linkText: {
    color: COLOR_BLUE,
    fontSize: FONT_SIZE_MD,
  },
});

export const SCREENS = {
  CLOCK: 'CLOCK',
  HISTORY: 'HISTORY',
  GRAPHS: 'GRAPHS',
  DETAIL: 'DETAIL',
  DATE_PICKER: 'DATE_PICKER',
  TOTALS: 'TOTALS',
};
