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

export const IMG_ADD = require('../images/add.png');
export const IMG_DELETE = require('../images/delete.png');
export const IMG_EDIT = require('../images/edit.png');
export const IMG_MENU = require('../images/menu.png');
export const IMG_SEARCH = require('../images/search.png');
export const IMG_SUN = require('../images/sun.png');
export const IMG_X = require('../images/x.png');
export const IMG_GRAY_X = require('../images/gray_x.png');

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
};
