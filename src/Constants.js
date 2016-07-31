import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_XS = 12;
export const FONT_SIZE_SM = 16;
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

export const TABBAR_SIZE = 60;

export const IMG_DARKGRAY_CLOCK =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/darkgray_clock.png' };
export const IMG_DARKGRAY_GRAPH =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/darkgray_graph.png' };
export const IMG_DARKGRAY_HISTORY =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/darkgray_history.png' };
export const IMG_DARKGRAY_MENU =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/darkgray_menu.png' };
export const IMG_GRAY_ADD =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/gray_add.png' };
export const IMG_GRAY_EDIT =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/gray_edit.png' };
export const IMG_GRAY_SEARCH =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/gray_search.png' };
export const IMG_GRAY_X =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/gray_x.png' };
export const IMG_RED_DELETE =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/red_delete.png' };
export const IMG_WHITE_CIRCLE_X =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/white_circle_x.png' };
export const IMG_YELLOW_SUN =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/yellow_sun.png' };

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
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: TABBAR_SIZE,
    paddingHorizontal: GUTTER_LG,
    paddingTop: GUTTER_LG,
  },
  scrollableScreen: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: TABBAR_SIZE,
    paddingHorizontal: GUTTER_LG,
    paddingTop: GUTTER_LG,
  },
  screenReducedPadding: {
    paddingHorizontal: GUTTER_MD,
    paddingTop: GUTTER_MD,
  },
  linkText: {
    color: COLOR_BLUE,
    fontSize: FONT_SIZE_MD,
  },
  emptyPlaceholder: {
    color: COLOR_GRAY,
    fontSize: FONT_SIZE_MD,
    fontStyle: 'italic',
  },
});

export const SCREENS = {
  CLOCK: 'CLOCK',
  HISTORY: 'HISTORY',
  GRAPHS: 'GRAPHS',
  DETAIL: 'DETAIL',
  DATE_PICKER: 'DATE_PICKER',
  TAG_EDITOR: 'TAG_EDITOR',
  TOTALS: 'TOTALS',
};
