import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_MD = 20;
export const FONT_SIZE_LG = 30;
export const FONT_SIZE_XL = 60;

export const COLOR_GREEN = '#82C686';
export const COLOR_RED = '#ED7272';
export const COLOR_GRAY = '#B4B4B4';
export const COLOR_DARK_GRAY = '#4A4A4A';

export const GUTTER_MD = 20;
export const GUTTER_LG = 40;

export const STYLES = StyleSheet.create({
  text: {
    color: COLOR_DARK_GRAY,
    fontSize: FONT_SIZE_MD,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: COLOR_GRAY,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: FONT_SIZE_MD,
    padding: GUTTER_MD,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    padding: GUTTER_LG,
  },
});

// TODO: maybe move this to a router?
export const SCREENS = {
  CLOCK_IN: 'CLOCK_IN',
  CLOCK_OUT: 'CLOCK_OUT',
  CONFIRM: 'CONFIRM',
  HISTORY: 'HISTORY',
};
