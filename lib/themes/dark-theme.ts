import {
  blueDark,
  greenDark,
  purpleDark,
  yellowDark,
  redDark,
  cyanDark,
  pinkDark,
  grayDark,
  gray,
  blue,
  cyan,
  pink,
} from './colors'

export const DarkThemeValue = {
  colors: {
    // background
    background: 'black',
    backgroundAlpha: 'rgba(0, 0, 0, 0.6)',
    foreground: 'white',
    backgroundContrast: grayDark.gray50,
    rapidBackgroundItem: 'rgb(13, 17, 23)',
    // semantic colors
    backGroundTabRapid: 'black',
    backgroundSelectedTab: 'rgb(13, 17, 23)',
    backgroundModal: 'rgb(22, 27, 34)',
    backgroundReopen: 'rgb(33, 38, 45)',

    ...blueDark,
    ...purpleDark,
    ...greenDark,
    ...yellowDark,
    ...redDark,
    ...cyanDark,
    ...pinkDark,
    ...grayDark,

    // misc
    textLight: 'rgba(236, 237, 238, 10.2)',
    text: gray.gray900,
    linkLight: 'rgba(0, 114, 245, 0.2)',
    link: blue.blue700,
    codeLight: cyan.cyan50,
    code: cyan.cyan600,
    selection: pink.pink800,
    border: 'rgba(255, 255, 255, 0.15)',

    primary: blueDark.blue600,
    success: greenDark.green600,
    secondary: purpleDark.purple700,
    warning: yellowDark.yellow600,
    error: redDark.red600,
    gradient: `linear-gradient(112deg, ${cyanDark.cyan600} -63.59%, ${pinkDark.pink600} -20.3%, ${blueDark.blue600} 70.46%)`,

    primaryLight: blueDark.blue200,
    secondaryLight: purpleDark.purple200,
    successLight: greenDark.green200,
    warningLight: yellowDark.yellow200,
    errorLight: redDark.red200,

    primaryLightHover: blueDark.blue400,
    secondaryLightHover: purpleDark.purple400,
    successLightHover: greenDark.green400,
    warningLightHover: yellowDark.yellow400,
    errorLightHover: redDark.red400,
  },
  shadows: {
    xs: '0 2px 8px 1px rgb(0 0 0 / 0.07), 0 1px 1px -1px rgb(0 0 0 / 0.04)',
    sm: '0 2px 8px 2px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
    md: '0 12px 20px 6px rgb(0 0 0 / 0.08)',
    lg: '0 12px 34px 6px rgb(0 0 0 / 0.18)',
    xl: '0 25px 65px 0px rgb(0 0 0 / 0.35)',
  },
  dropShadows: {
    xs: 'drop-shadow(0 2px 4px rgb(0 0 0 / 0.07)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.04))',
    sm: 'drop-shadow(0 2px 8px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.04))',
    md: 'drop-shadow(0 4px 12px rgb(0 0 0 / 0.08)) drop-shadow(0 20px 8px rgb(0 0 0 / 0.04))',
    lg: 'drop-shadow(0 12px 24px rgb(0 0 0 / 0.15)) drop-shadow(0 12px 14px rgb(0 0 0 / 0.1))',
    xl: 'drop-shadow(0 25px 34px rgb(0 0 0 / 0.35))',
  },
}
