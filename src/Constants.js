import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_XS = 12;
export const FONT_SIZE_SM = 16;
export const FONT_SIZE_MD = 20;
export const FONT_SIZE_LG = 30;
export const FONT_SIZE_XL = 50;

export const COLOR_BLUE = '#54B6EE';
export const COLOR_DARK_GRAY = '#4A4A4A';
export const COLOR_DARK_GREEN = '#519355';
export const COLOR_GRAY = '#B4B4B4';
export const COLOR_GREEN = '#82C686';
export const COLOR_RED = '#ED7272';
export const COLOR_YELLOW = '#F8E71C';

export const GUTTER_SM = 10;
export const GUTTER_MD = 20;
export const GUTTER_LG = 40;

export const TABBAR_SIZE = 60;

export const IMG_CLOCK =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/clock.png' };
export const IMG_GRAPH =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/analyze.png' };
export const IMG_HISTORY =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/history.png' };
export const IMG_X =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/x.png' };
export const IMG_DELETE =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/delete.png' };
export const IMG_CIRCLE_X =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/circle-x.png' };
export const IMG_SUN =
  { uri: 'http://s3-us-west-1.amazonaws.com/quicktick/sun.png' };

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
    tintColor: COLOR_DARK_GRAY,
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
