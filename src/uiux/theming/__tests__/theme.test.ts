import defaultColors from '../colors'
import { createTheme } from '../theme'

describe('Theme', () => {
  const defaultLightTheme = createTheme('light')
  const defaultDarkTheme = createTheme('dark')

  it('should return return a light theme with no args', () => {
    const theme = createTheme('light')
    expect(JSON.stringify(theme)).toEqual(JSON.stringify(defaultLightTheme))
  })

  it('should return return a light theme when passed default colors', () => {
    const theme = createTheme('light', defaultColors)
    expect(JSON.stringify(theme)).toEqual(JSON.stringify(defaultLightTheme))
  })

  it('should return return a dark theme with no args', () => {
    const theme = createTheme('dark')
    expect(JSON.stringify(theme)).toEqual(JSON.stringify(defaultDarkTheme))
  })

  it('should return return a dark theme when passed default colors', () => {
    const theme = createTheme('dark', defaultColors)
    expect(JSON.stringify(theme)).toEqual(JSON.stringify(defaultDarkTheme))
  })
})
