export interface ColorTheme {
  primary: string;
  secondary: string;
  themeBlue: string;
  lightThemeBlue: string;
  themeSecondaryBlue: string;
  whitePrimary: string;
  blackPrimary: string;
  disabled: string;
  greenPrimary: string;
  yellowPrimary: string;
  redPrimary: string;
  grayPrimary: string;
  cardBackground:string

  text: string;
  textWhite: string;
  labelText: string;
  labelInactive: string;
  lightGray: string;
  skyBlue: string;
  grey: string;
  textSecond: string;
  textThird: string;
  blueSecond: string;
  blueThird: string;
  textFourth: string;
  extraLightGrey: string;
  extraLightGreyTwo: string;
  purple: string;
  lightBlue: string;
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
