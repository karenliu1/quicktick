import { StyleSheet } from 'react-native';

export const FONT_FAMILY = 'Avenir';
export const FONT_SIZE_MD = 20;
export const FONT_SIZE_LG = 60;

export const COLOR_GREEN = '#82C686';
export const COLOR_RED = '#ED7272';
export const COLOR_GRAY = '#979797';
export const COLOR_TEXT = '#4A4A4A';

export const GUTTER_MD = 15;
export const GUTTER_LG = 40;

export const STYLES = StyleSheet.create({
  text: {
    color: COLOR_TEXT,
    fontSize: FONT_SIZE_MD,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
});

// TODO: maybe move this to a router?
export const SCREENS = {
  CLOCK_IN: 'CLOCK_IN',
  CLOCK_OUT: 'CLOCK_OUT',
  CONFIRM: 'CONFIRM',
  HISTORY: 'HISTORY',
};
