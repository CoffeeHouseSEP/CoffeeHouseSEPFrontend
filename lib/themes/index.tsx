import { DarkThemeValue } from './dark-theme'
import { LightThemeValue } from './light-theme'

export const themeValue = {
  dark: DarkThemeValue,
  light: LightThemeValue,
}

export type ThemeKey = keyof typeof themeValue
