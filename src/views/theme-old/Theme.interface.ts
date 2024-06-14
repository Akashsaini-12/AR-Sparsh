export interface ColorTheme {
  primary: string;
  secondary: string;
  onPrimary: string;
  surface: string;
  onSurface: string;
  background: string;
  disabled: string;

  text: string;
  textBack: string;
  labelText: string;
  labelBack: string;
  labelInactive: string;
  buttonText: string;
  buttonBack: string;

  stdButtonText: string; // text color for button text
  stdButton: string; // background of button, radiobutton boundries, textbox border
  stdText: string; // imput box text color
  stdTextSurface: string; // input box background
  stdLabel: string; // label color
  stdLabelSurface: string; // label background color
  stdBarText: string; // tabbar text/icon color
  stdBarSurface: string; // tabbar background color
  stdBorder: string;

  activeButtonText: string; // text color for button text
  activeButton: string; // background of button, radiobutton boundries, textbox border
  activeText: string; // imput box text color
  activeTextSurface: string; // input box background
  activeLabel: string; // label color
  activeLabelSurface: string; // label background color
  activeBarText: string; // tabbar text/icon color
  activeBarSurface: string; // tabbar background color
  activeBorder: string;

  disabledButtonText: string; // text color for button text
  disabledButton: string; // background of button, radiobutton boundries, textbox border
  disabledText: string; // imput box text color
  disabledTextSurface: string; // input box background
  disabledLabel: string; // label color
  disabledLabelSurface: string; // label background color
  disabledBarText: string; // tabbar text/icon color
  disabledBarSurface: string; // tabbar background color
  disabledBorder: string;

  stdBaseScreenBackground: string;

  inactiveColor: string;
  activeColor: string;
  disabledColor: string;
  stdScreenBackground: string;
}

export interface sizeTheme {
  size2: number;
  size3: number;
  size5: number;
  size7: number;
  size10: number;
  size12: number;
  size14: number;
  size15: number;
  size18: number;
  size20: number;
  size22: number;
  size24: number;
  size25: number;
  size26: number;
  size28: number;
  size30: number;
  size35: number;
  size45: number;
  size55: number;
  size60: number;
  size70: number;
  size75: number;
  size80: number;
  size85: number;
  size90: number;
  size100: number;
  size120: number;
}

export interface fontSizeTheme {
  size6: number;
  size8: number;
  size9: number;
  size10: number;
  size11: number;
  size12: number;
  size13: number;
  size15: number;
  size18: number;
  size20: number;
  size25: number;
  size30: number;
  size35: number;
  size40: number;
  size45: number;
  size50: number;
}
export interface Theme {
  id: string;
  scale: number;
  color: ColorTheme;
  fontsize: fontSizeTheme;
  size: sizeTheme;
}
