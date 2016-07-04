import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_MD = 20;
export const FONT_SIZE_LG = 30;
export const FONT_SIZE_XL = 60;

export const COLOR_GREEN = '#82C686';
export const COLOR_RED = '#ED7272';
export const COLOR_GRAY = '#B4B4B4';
export const COLOR_DARK_GRAY = '#4A4A4A';

export const GUTTER_SM = 10;
export const GUTTER_MD = 20;
export const GUTTER_LG = 40;

export const IMG_MENU = require('../images/menu.png');
export const IMG_SUN = require('../images/sun.png');
export const IMG_EDIT = require('../images/edit.png');
export const IMG_DELETE = require('../images/delete.png');

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
    padding: GUTTER_MD,
  },
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    padding: GUTTER_LG,
  },
});

export const SCREENS = {
  CLOCK: 'CLOCK',
  HISTORY: 'HISTORY',
  GRAPHS: 'GRAPHS',
};
