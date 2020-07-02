import * as React from 'react'
import { Text, TextStyle } from 'react-native'
import { withTheme } from '../../theming'
import * as Kancha from '../../types'

export const TextTypes: Kancha.TextTypesStatic = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  ListItem: 'listItem',
  ListItemRight: 'listItemRight',
  ListItemNote: 'listItemNote',
  SubTitle: 'subTitle',
  ActivityTitle: 'activityTitle',
  ActivitySubTitle: 'activitySubTitle',
  Body: 'body',
  Button: 'button',
  ButtonSmall: 'buttonSmall',
  NavButton: 'navButton',
  Summary: 'summary',
  SectionHeader: 'sectionHeader',
}
/**
 * Kancha Text Props
 */

export interface TextProps {
  /**
   * A testID for the text element
   */
  testID?: string
  /**
   * The type of text to display. This will be styled accordinly to the theme
   */
  type?: string

  /**
   * The type of text to display. This will be styled accordinly to the theme
   */
  onPress?: () => void

  /**
   * Overide the color with a warning color
   */
  warn?: boolean

  /**
   * Color prop is used to configure button text colors
   */
  buttonTextColor?: Kancha.BrandPropOptions

  /**
   * Overide the brand color
   */
  textColor?: string

  /**
   * Overide the color with a warning color
   */
  block?: Kancha.BlockPropsOptions

  /**
   * Make the text bold
   */
  bold?: boolean

  /**
   * The padding around the text
   */
  padding?: number

  /**
   * A bottom padding for the text. Useful for headings
   */
  paddingBottom?: number | boolean | undefined

  /**
   * The margin around the text
   */
  margin?: number

  /**
   * The margin around the text
   */
  textAlign?: string

  /**
   * Decoration for button text
   */
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined

  /**
   * Transform the text
   */
  transform?: 'uppercase' | 'lowercase' | undefined

  /**
   * Transform the text
   */
  textStyle?: TextStyle

  /**
   * All the text to be selectable
   */
  selectable?: boolean

  /**
   * Transform the text
   */
  theme: any
}

const KanchaText: React.FC<TextProps> & { Types: Kancha.TextTypesStatic } = props => {
  const TextThemeMap: Kancha.TextDefaultThemeMapTypes = {
    h1: {
      fontSize: props.theme.text.sizes.h1,
      color: props.theme.colors.primary.text,
    },
    h2: {
      fontSize: props.theme.text.sizes.h2,
      color: props.theme.colors.primary.text,
    },
    h3: {
      fontSize: props.theme.text.sizes.h3,
      color: props.theme.colors.primary.text,
    },
    h4: {
      fontSize: props.theme.text.sizes.h4,
      color: props.theme.colors.primary.text,
    },
    h5: {
      fontSize: props.theme.text.sizes.h5,
      color: props.theme.colors.primary.text,
    },
    activityTitle: {
      fontSize: props.theme.text.sizes.activityTitle,
      color: props.theme.colors.primary.text,
    },
    activitySubTitle: {
      fontSize: props.theme.text.sizes.activitySubTitle,
      color: props.theme.colors.secondary.text,
    },
    subTitle: {
      fontSize: props.theme.text.sizes.subTitle,
      color: props.theme.colors.secondary.text,
    },
    listItem: {
      fontSize: props.theme.text.sizes.listItem,
      color: props.theme.colors.primary.text,
    },
    listItemNote: {
      fontSize: props.theme.text.sizes.listItemNote,
      color: props.theme.colors.secondary.text,
    },
    listItemRight: {
      fontSize: props.theme.text.sizes.listItemRight,
      color: props.theme.colors.secondary.text,
    },
    summary: {
      fontSize: props.theme.text.sizes.summary,
      color: props.theme.colors.secondary.text,
    },
    body: {
      fontSize: props.theme.text.sizes.body,
      color: props.theme.colors.primary.text,
      lineHeight: props.theme.text.lineHeights.body,
    },
    button: {
      fontSize: props.theme.text.sizes.button,
    },
    buttonSmall: {
      fontSize: props.theme.text.sizes.buttonSmall,
    },
    navButton: {
      fontSize: props.theme.text.sizes.navButton,
    },
    sectionHeader: {
      fontSize: props.theme.text.sizes.sectionHeader,
      color: props.theme.colors.secondary.text,
    },
  }
  const styles: TextStyle = {
    ...(props.type ? { ...TextThemeMap[props.type] } : { ...TextThemeMap[TextThemeMap.body] }),
    ...(props.textColor ? { color: props.textColor } : {}),
    ...(props.bold ? { fontWeight: 'bold' } : {}),
    ...(props.warn ? { color: props.theme.colors.theme.WARN } : {}),
    ...(props.textAlign ? { textAlign: props.textAlign } : {}),
    ...(props.buttonTextColor
      ? {
          color: props.block
            ? props.theme.colors[props.buttonTextColor].buttonText[props.block]
            : props.theme.colors[props.buttonTextColor].buttonText.filled,
        }
      : {}),
    ...(props.paddingBottom ? { paddingBottom: props.paddingBottom } : {}),
    ...(props.paddingBottom && typeof props.paddingBottom === 'boolean'
      ? { paddingBottom: props.theme.spacing.default }
      : {}),
    ...(props.transform ? { textTransform: props.transform } : {}),
    ...(props.textStyle ? { ...props.textStyle } : {}),
    flexWrap: 'wrap',
  }

  return (
    <Text
      selectable={props.selectable}
      style={styles}
      testID={props.testID}
      accessibilityLabel={props.testID}
      onPress={props.onPress && props.onPress}
    >
      {props.children}
    </Text>
  )
}

KanchaText.Types = TextTypes

export default withTheme(KanchaText)
