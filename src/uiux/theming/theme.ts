import DEFAULT_COLORS from './colors'
import merge from 'deepmerge'

/**
 *  Create theme allows you to pass custom colors to the theme file.
 *  The existing color keys need to be used with with `createTheme`.
 *
 *  If you are using a color object with custom key names you should use mergeTheme and overwrite all
 *  color references
 *
 *  ```jsx
 *  export default createTheme(CUSTOM_COLORS)
 * ```
 */

const lightTheme = (colors: { [index: string]: string }) => {
  return {
    statusBarStyle: 'dark-content',
    colors: {
      theme: {
        ...colors,
      },
      primary: {
        brand: colors.BRAND,
        text: colors.PRIMARY_BRAND_LIGHT,
        background: colors.PRIMARY_BACKGROUND,
        divider: colors.MEDIUM_GREY,
        accessories: colors.LIGHT_GREY,
        underlay: colors.MEDIUM_GREY,
        button: colors.BRAND,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.BRAND,
          clear: colors.BRAND,
        },
      },
      secondary: {
        brand: colors.LIGHT_GREY,
        text: colors.LIGHT_GREY,
        background: colors.LIGHTEST_GREY,
        divider: colors.MEDIUM_GREY,
        accessories: colors.MEDIUM_GREY,
        underlay: colors.MEDIUM_GREY,
        button: colors.SECONDARY_BRAND_MAIN,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.MEDIUM_GREY,
          clear: colors.MEDIUM_GREY,
        },
      },
      tertiary: {
        brand: colors.LIGHT_GREY,
        text: colors.LIGHT_GREY,
        background: colors.LIGHT_GREY,
        divider: colors.LIGHT_GREY,
        accessories: colors.LIGHT_GREY,
        underlay: colors.LIGHT_GREY,
        button: colors.LIGHT_GREY,
        buttonText: {
          filled: colors.LIGHT_GREY,
          outlined: colors.LIGHT_GREY,
          clear: colors.LIGHT_GREY,
        },
      },
      accent: {
        brand: colors.ACCENT,
        text: colors.ACCENT,
        background: colors.ACCENT,
        divider: colors.ACCENT,
        accessories: colors.ACCENT,
        underlay: colors.ACCENT,
        button: colors.ACCENT,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.ACCENT,
          clear: colors.ACCENT,
        },
      },
      warning: {
        brand: colors.WARN,
        text: colors.WARN,
        background: colors.WARN,
        divider: colors.WARN,
        accessories: colors.WARN,
        underlay: colors.WARN,
        button: colors.WARN,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.WARN,
          clear: colors.WARN,
        },
      },
      confirm: {
        brand: colors.CONFIRM,
        text: colors.CONFIRM,
        background: colors.CONFIRM,
        divider: colors.CONFIRM,
        accessories: colors.CONFIRM,
        underlay: colors.CONFIRM,
        button: colors.CONFIRM,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.CONFIRM,
          clear: colors.CONFIRM,
        },
      },
      custom: {
        brand: colors.BRAND,
        text: colors.PRIMARY_BRAND_LIGHT,
        background: colors.BRAND,
        divider: colors.PRIMARY_BRAND_LIGHT,
        accessories: colors.PRIMARY_BRAND_LIGHT,
        underlay: colors.PRIMARY_BRAND_LIGHT,
        button: colors.WHITE,
        buttonText: {
          filled: colors.PRIMARY_BRAND_MAIN,
          outlined: colors.CONFIRM,
          clear: colors.CONFIRM,
        },
      },
    },
  }
}

const darkTheme = (colors: { [index: string]: string }) => {
  return {
    statusBarStyle: 'light-content',
    colors: {
      theme: {
        ...colors,
      },
      primary: {
        brand: colors.BRAND,
        text: colors.WHITE,
        background: colors.DARK_GREY,
        divider: colors.CHARCOAL,
        accessories: colors.MEDIUM_GREY,
        underlay: colors.MEDIUM_GREY,
        button: colors.BRAND,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.BRAND,
          clear: colors.BRAND,
        },
      },
      secondary: {
        brand: colors.LIGHT_GREY,
        text: colors.MEDIUM_GREY,
        background: colors.BLACK,
        divider: colors.MEDIUM_GREY,
        accessories: colors.MEDIUM_GREY,
        underlay: colors.MEDIUM_GREY,
        button: colors.MEDIUM_GREY,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.MEDIUM_GREY,
          clear: colors.MEDIUM_GREY,
        },
      },
      tertiary: {
        brand: colors.LIGHT_GREY,
        text: colors.LIGHT_GREY,
        background: colors.LIGHT_GREY,
        divider: colors.LIGHT_GREY,
        accessories: colors.LIGHT_GREY,
        underlay: colors.LIGHT_GREY,
        button: colors.LIGHT_GREY,
        buttonText: {
          filled: colors.LIGHT_GREY,
          outlined: colors.LIGHT_GREY,
          clear: colors.LIGHT_GREY,
        },
      },
      accent: {
        brand: colors.ACCENT,
        text: colors.ACCENT,
        background: colors.ACCENT,
        divider: colors.ACCENT,
        accessories: colors.ACCENT,
        underlay: colors.ACCENT,
        button: colors.ACCENT,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.ACCENT,
          clear: colors.ACCENT,
        },
      },
      warning: {
        brand: colors.WARN,
        text: colors.WARN,
        background: colors.WARN,
        divider: colors.WARN,
        accessories: colors.WARN,
        underlay: colors.WARN,
        button: colors.WARN,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.WARN,
          clear: colors.WARN,
        },
      },
      confirm: {
        brand: colors.CONFIRM,
        text: colors.CONFIRM,
        background: colors.CONFIRM,
        divider: colors.CONFIRM,
        accessories: colors.CONFIRM,
        underlay: colors.CONFIRM,
        button: colors.CONFIRM,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.CONFIRM,
          clear: colors.CONFIRM,
        },
      },
      custom: {
        brand: colors.BRAND,
        text: colors.PRIMARY_BRAND_LIGHT,
        background: colors.BRAND,
        divider: colors.PRIMARY_BRAND_LIGHT,
        accessories: colors.PRIMARY_BRAND_LIGHT,
        underlay: colors.PRIMARY_BRAND_LIGHT,
        button: colors.PRIMARY_BRAND_LIGHT,
        buttonText: {
          filled: colors.WHITE,
          outlined: colors.CONFIRM,
          clear: colors.CONFIRM,
        },
      },
    },
  }
}

export const createTheme = (
  theme: string,
  customColors?: null | { [index: string]: string },
  lightSection?: null | any,
  darkSection?: null | any,
) => {
  const colors = customColors ? customColors : DEFAULT_COLORS
  const customDarkSection = darkSection ? darkSection(colors) : null
  const customlightSection = lightSection ? lightSection(colors) : null
  const customSection =
    theme === 'light' ? customlightSection : customDarkSection
  const appliedColors =
    theme === 'light' ? lightTheme(colors) : darkTheme(colors)

  const baseTheme = {
    ...appliedColors,
    text: {
      lineHeights: {
        body: 22,
      },
      sizes: {
        h1: 32,
        h2: 24,
        h3: 20,
        h4: 18,
        h5: 16,
        h6: 14,
        subTitle: 14,
        activityTitle: 17,
        activitySubTitle: 15,
        listItem: 18,
        listItemRight: 18,
        listItemNote: 15,
        sectionHeader: 14,
        summary: 18,
        body: 18,
        button: 18,
        buttonSmall: 18,
        navButton: 20,
      },
    },
    spacing: {
      default: 15,
      section: 20,
    },
    roundedCorners: {
      buttons: 16,
      cards: 5,
      textInputs: 8,
      toasts: 5,
      overlay: 8,
    },
    delays: {
      toasts: 1200,
    },
    // Move to the constants
    activity: {
      messages: {
        sdr: 'requested information from',
        'w3c.vp': 'shared credentials with',
        'w3c.vc': 'issued a credential to',
      },
    },
    icons: {
      EDIT: {
        name: 'ios-create',
        iconFamily: 'Ionicons',
      },
      CHECKED: {
        name: 'ios-checkmark-circle',
        iconFamily: 'Ionicons',
      },
      CHECKMARK: {
        name: 'ios-checkmark',
        iconFamily: 'Ionicons',
      },
      FORWARD: {
        name: 'ios-arrow-forward',
        iconFamily: 'Ionicons',
      },
      LINK: {
        name: 'ios-open',
        iconFamily: 'Ionicons',
      },
      CLOSE: {
        name: 'ios-close',
        iconFamily: 'Ionicons',
      },
      SUCCESS: {
        name: 'ios-checkmark-circle-outline',
        iconFamily: 'Ionicons',
      },
      CONFIRM: {
        name: 'ios-checkmark-circle-outline',
        iconFamily: 'Ionicons',
      },
      ERROR: {
        name: 'ios-warning',
        iconFamily: 'Ionicons',
      },
      INFO: {
        name: 'ios-information-circle-outline',
        iconFamily: 'Ionicons',
      },
      WARN: {
        name: 'ios-warning',
        iconFamily: 'Ionicons',
      },
      DOWN: {
        name: 'ios-arrow-down',
        iconFamily: 'Ionicons',
      },
      UP: {
        name: 'ios-arrow-up',
        iconFamily: 'Ionicons',
      },
      RADIO_ON: {
        name: 'ios-radio-button-on',
        iconFamily: 'Ionicons',
      },
      RADIO_OFF: {
        name: 'ios-radio-button-off',
        iconFamily: 'Ionicons',
      },
      INCOMING_ITEM: {
        name: 'ios-return-right',
        iconFamily: 'Ionicons',
      },
      OUTGOING_ITEM: {
        name: 'ios-return-left',
        iconFamily: 'Ionicons',
      },
    },
  }

  return customSection ? merge(baseTheme, customSection) : baseTheme
}
