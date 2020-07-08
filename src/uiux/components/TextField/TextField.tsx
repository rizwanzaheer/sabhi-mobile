import * as React from 'react'
import { withTheme } from '../../theming'
import * as UIUX from '../../types'

import Icon from '../Icon/Icon'
import Container from '../Container/Container'

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield'

export const TextTypes: UIUX.TextTypesStatic = {
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
 * UIUX Text Props
 */

export interface UIUXTextFieldProps {
  /**
   * A testID for the text element
   */
  testID?: string

  label?: string

  keyboardType?: string

  baseColor?: string

  tintColor?: string

  textColor?: string

  iconColor?: string

  iconName?: string

  iconFamily?: string

  lineWidth?: number

  activeLineWidth?: number

  fontSize?: number

  // /**
  //  * The type of text to display. This will be styled accordinly to the theme
  //  */
  // type?: string

  // /**
  //  * The type of text to display. This will be styled accordinly to the theme
  //  */
  // onPress?: () => void

  // /**
  //  * Overide the color with a warning color
  //  */
  // warn?: boolean

  // /**
  //  * Color prop is used to configure button text colors
  //  */
  // buttonTextColor?: UIUX.BrandPropOptions

  // /**
  //  * Overide the brand color
  //  */
  // textColor?: string

  // /**
  //  * Overide the color with a warning color
  //  */
  // block?: UIUX.BlockPropsOptions

  // /**
  //  * Make the text bold
  //  */
  // bold?: boolean

  // /**
  //  * The padding around the text
  //  */
  // padding?: number

  // /**
  //  * A bottom padding for the text. Useful for headings
  //  */
  // paddingBottom?: number | boolean | undefined

  // /**
  //  * The margin around the text
  //  */
  // margin?: number

  // /**
  //  * The margin around the text
  //  */
  // textAlign?: string

  // /**
  //  * Decoration for button text
  //  */
  // textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined

  // /**
  //  * Transform the text
  //  */
  // transform?: 'uppercase' | 'lowercase' | undefined

  // /**
  //  * Transform the text
  //  */
  // textStyle?: TextStyle

  // /**
  //  * All the text to be selectable
  //  */
  // selectable?: boolean

  /**
   * Transform the text
   */
  theme: any
}

const UIUXTextField: React.FC<UIUXTextFieldProps> =
  // & {
  //   Types: UIUX.TextTypesStatic
  // }
  props => {
    // const TextThemeMap: UIUX.TextDefaultThemeMapTypes = {
    //   h1: {
    //     fontSize: props.theme.text.sizes.h1,
    //     color: props.theme.colors.primary.text,
    //   },
    //   h2: {
    //     fontSize: props.theme.text.sizes.h2,
    //     color: props.theme.colors.primary.text,
    //   },
    //   h3: {
    //     fontSize: props.theme.text.sizes.h3,
    //     color: props.theme.colors.primary.text,
    //   },
    //   h4: {
    //     fontSize: props.theme.text.sizes.h4,
    //     color: props.theme.colors.primary.text,
    //   },
    //   h5: {
    //     fontSize: props.theme.text.sizes.h5,
    //     color: props.theme.colors.primary.text,
    //   },
    //   activityTitle: {
    //     fontSize: props.theme.text.sizes.activityTitle,
    //     color: props.theme.colors.primary.text,
    //   },
    //   activitySubTitle: {
    //     fontSize: props.theme.text.sizes.activitySubTitle,
    //     color: props.theme.colors.secondary.text,
    //   },
    //   subTitle: {
    //     fontSize: props.theme.text.sizes.subTitle,
    //     color: props.theme.colors.secondary.text,
    //   },
    //   listItem: {
    //     fontSize: props.theme.text.sizes.listItem,
    //     color: props.theme.colors.primary.text,
    //   },
    //   listItemNote: {
    //     fontSize: props.theme.text.sizes.listItemNote,
    //     color: props.theme.colors.secondary.text,
    //   },
    //   listItemRight: {
    //     fontSize: props.theme.text.sizes.listItemRight,
    //     color: props.theme.colors.secondary.text,
    //   },
    //   summary: {
    //     fontSize: props.theme.text.sizes.summary,
    //     color: props.theme.colors.secondary.text,
    //   },
    //   body: {
    //     fontSize: props.theme.text.sizes.body,
    //     color: props.theme.colors.primary.text,
    //     lineHeight: props.theme.text.lineHeights.body,
    //   },
    //   button: {
    //     fontSize: props.theme.text.sizes.button,
    //   },
    //   buttonSmall: {
    //     fontSize: props.theme.text.sizes.buttonSmall,
    //   },
    //   navButton: {
    //     fontSize: props.theme.text.sizes.navButton,
    //   },
    //   sectionHeader: {
    //     fontSize: props.theme.text.sizes.sectionHeader,
    //     color: props.theme.colors.secondary.text,
    //   },
    // }
    // const styles: TextStyle = {
    //   ...(props.type ? { ...TextThemeMap[props.type] } : { ...TextThemeMap[TextThemeMap.body] }),
    //   ...(props.textColor ? { color: props.textColor } : {}),
    //   ...(props.bold ? { fontWeight: 'bold' } : {}),
    //   ...(props.warn ? { color: props.theme.colors.theme.WARN } : {}),
    //   ...(props.textAlign ? { textAlign: props.textAlign } : {}),
    //   ...(props.buttonTextColor
    //     ? {
    //       color: props.block
    //         ? props.theme.colors[props.buttonTextColor].buttonText[props.block]
    //         : props.theme.colors[props.buttonTextColor].buttonText.filled,
    //     }
    //     : {}),
    //   ...(props.paddingBottom ? { paddingBottom: props.paddingBottom } : {}),
    //   ...(props.paddingBottom && typeof props.paddingBottom === 'boolean'
    //     ? { paddingBottom: props.theme.spacing.default }
    //     : {}),
    //   ...(props.transform ? { textTransform: props.transform } : {}),
    //   ...(props.textStyle ? { ...props.textStyle } : {}),
    //   flexWrap: 'wrap',
    // }

    return (
      <Container>
        <TextField
          label={props.label || 'enter value'}
          baseColor={props.baseColor}
          tintColor={props.tintColor}
          textColor={props.textColor}
          lineWidth={props.lineWidth || 2}
          activeLineWidth={props.activeLineWidth || 4}
          // placeholder={'Please enter country of residence'}
          fontSize={props.fontSize || 18}
          inputContainerStyle={{
            paddingRight: 32,
          }}
          keyboardType={props.keyboardType || 'numeric'}
          // formatText={this.formatText}
          // onSubmitEditing={this.onSubmit}
          // ref={this.fieldRef}
        />
        <Container viewStyle={{ position: 'absolute', right: 0, top: 30 }}>
          <Icon
            color={props.iconColor}
            icon={{
              name: props.iconName || 'edit',
              iconFamily: props.iconFamily || 'MaterialIcons',
            }}
          />
        </Container>
      </Container>
    )
  }

// UIUXTextField.Types = TextTypes

export default withTheme(UIUXTextField)
