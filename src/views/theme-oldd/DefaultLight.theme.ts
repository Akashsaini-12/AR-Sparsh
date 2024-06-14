import {ColorTheme, fontSizeTheme, sizeTheme, Theme} from './Theme.interface';
// Define our light theme colors
const SCALE = 1;
const DEFAULT_LIGHT_COLOR_THEME: ColorTheme = {
  primary: '#1c6ba4',
  secondary: '#dcedf9',
  themeBlue: '#023C66',
  themeSecondaryBlue: '#1f4e79',
  whitePrimary: '#ffffff',
  blackPrimary: '#000000',
  disabled: '#dedede',

  
  text: '#111',
  textWhite: '#fff',
  labelText: '#555',
  labelInactive: '#555',
  textLightBlack: '#333',
};

const DEFAULT_LIGHT_SIZE_THEME: sizeTheme = {
  size2: 2 * SCALE,
  size3: 3 * SCALE,
  size5: 5 * SCALE,
  size7: 7 * SCALE,
  size10: 10 * SCALE,
  size12: 12 * SCALE,
  size14: 14 * SCALE,
  size15: 15 * SCALE,
  size18: 18 * SCALE,
  size20: 20 * SCALE,
  size22: 22 * SCALE,
  size24: 24 * SCALE,
  size25: 25 * SCALE,
  size26: 26 * SCALE,
  size28: 28 * SCALE,
  size30: 30 * SCALE,
  size35: 35 * SCALE,
  size45: 45 * SCALE,
  size55: 55 * SCALE,
  size60: 60 * SCALE,
  size70: 70 * SCALE,
  size75: 75 * SCALE,
  size80: 80 * SCALE,
  size85: 85 * SCALE,
  size90: 90 * SCALE,
  size100: 100 * SCALE,
  size120: 120 * SCALE,
};
const DEFAULT_LIGHT_FONTSIZE_THEME: fontSizeTheme = {
  size6: 6 * SCALE,
  size8: 8 * SCALE,
  size9: 9 * SCALE,
  size10: 10 * SCALE,
  size11: 11 * SCALE,
  size12: 12 * SCALE,
  size13: 13 * SCALE,
  size15: 15 * SCALE,
  size18: 18 * SCALE,
  size20: 20 * SCALE,
  size25: 25 * SCALE,
  size30: 30 * SCALE,
  size35: 35 * SCALE,
  size40: 40 * SCALE,
  size45: 45 * SCALE,
  size50: 50 * SCALE,
};
export const DEFAULT_LIGHT_THEME_ID = 'default-light';
export const DEFAULT_LIGHT_THEME: Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  scale: SCALE,
  color: DEFAULT_LIGHT_COLOR_THEME,
  fontsize: DEFAULT_LIGHT_FONTSIZE_THEME,
  size: DEFAULT_LIGHT_SIZE_THEME,
};
