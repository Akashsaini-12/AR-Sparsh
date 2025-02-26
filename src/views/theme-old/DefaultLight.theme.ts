import {ColorTheme, fontSizeTheme, sizeTheme, Theme} from './Theme.interface';
// Define our light theme colors
const SCALE = 1;
const DEFAULT_LIGHT_COLOR_THEME: ColorTheme = {
  primary: '#023c66',
  secondary: '#dcedf9',

  onPrimary: '#fff',
  surface: '#fff',
  onSurface: '#000',
  background: '#dedede',
  disabled: '#dedede',

  text: '#111',
  textBack: '#fff',
  labelText: 'grey',
  labelBack: 'white',
  labelInactive: '#555',
  buttonText: '#fff',
  buttonBack: '#620066',

  stdButtonText: 'white',
  stdButton: '#023C66',
  stdText: '#023C66',
  stdTextSurface: 'white',
  stdLabel: 'grey',
  stdLabelSurface: 'white',
  stdBarText: 'white',
  stdBarSurface: '#000',
  stdBorder: 'skyblue',

  activeButtonText: 'white',
  activeButton: '#03A9F4',
  activeText: '#000',
  activeTextSurface: 'white',
  activeLabel: 'darkgrey',
  activeLabelSurface: 'white',
  activeBarText: 'white',
  activeBarSurface: '#22b8fc',
  activeBorder: '#22b8fc',

  disabledButtonText: 'grey',
  disabledButton: '#023C66',
  disabledText: 'darkgrey',
  disabledTextSurface: 'grey',
  disabledLabel: 'darkgrey',
  disabledLabelSurface: 'grey',
  disabledBarText: '#999',
  disabledBarSurface: '#999',
  disabledBorder: '#023C66',

  stdBaseScreenBackground: '#011429',

  inactiveColor: '#023C66',
  activeColor: '#03A9F4',
  disabledColor: '#DEDEDE',

  stdScreenBackground: 'white',
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
