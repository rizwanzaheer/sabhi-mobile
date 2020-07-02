import * as React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import { withTheme } from '../../theming'
import * as UIUX from '../../types'

interface ContainerProps {
  /** Test ID used for e2e tests */
  testID?: string

  /** Width */
  w?: string | number | undefined

  /** Height */
  h?: string | number | undefined

  /** Bottom */
  b?: string | number | undefined

  /** Right */
  r?: string | number | undefined

  /** Border radius */
  br?: number | undefined

  /** Flex */
  flex?: number | undefined

  /** Pre-defined backgrounds accordign to the theme. use these where possible. */
  background?: UIUX.BrandPropOptions

  /** Temporary option to create custom color. Avoid is possible and deprecate if you can by modifying the theme */
  backgroundColor?: string

  /** Flex direction */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined

  /** Align items */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined

  /** Justify Content */
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined

  /** Set the bottom divider */
  dividerBottom?: boolean

  /** et the top divider */
  dividerTop?: boolean

  /** Set the bottom margin */
  margin?: number | boolean | undefined

  /** Set the bottom margin */
  marginBottom?: number | boolean | undefined

  /** Set the top margin */
  marginTop?: number | boolean | undefined

  /** Set the bottom margin */
  marginLeft?: number | boolean | undefined

  /** Set the top margin */
  marginRight?: number | boolean | undefined

  /** Set the default padding */
  padding?: number | boolean | undefined

  /** Set the default paddingHorizontal */
  paddingHorizontal?: number | boolean | undefined

  /** Set the bottom padding */
  paddingBottom?: number | boolean | undefined

  /** Set the top padding */
  paddingTop?: number | boolean | undefined

  /** Set the left padding */
  paddingLeft?: number | boolean | undefined

  /** Set the right padding */
  paddingRight?: number | boolean | undefined

  /** Enable border for debugging layouts */
  debugBorder?: boolean

  /** Enable border for debugging layouts */
  borderColor?: string

  /** Enable border for debugging layouts */
  borderWidth?: number

  /** Change debug border color */
  debugBorderColor?: string | undefined

  /** Add addionaly custom styles for a container. Use sparingly!! */
  viewStyle?: ViewStyle

  /** Disable the view from being able to detect interactions */
  disabled?: boolean

  /** A shadow level to apply */
  shadow?: number

  /** An opacity level. Use 1, 2, 3 etc  */
  opacity?: number

  theme: any
}

/**
 * `Container` is the most fundamental building block in UIUX and should be used anywhere you would use a `View`.
 * In most cases the built-in React Native `View` component is used in conjunction with some some simple layout styles like flexbox casuing a mess of styles.
 * Using a `Container` these can just be added as props for declarative layouts that are easy to read.
 *
 * ```tsx
 * <Container br={4} flex={1} alignItems={'center'}>
 *   <Text>Hey, This is a container</Text>
 * </Container>
 * ```
 */
const Container: React.FunctionComponent<ContainerProps> = props => {
  const DividerBottomStyles: ViewStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: props.theme.colors.primary.divider,
  }

  const DividerTopStyles: ViewStyle = {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: props.theme.colors.primary.divider,
  }

  const BaseStyles: ViewStyle = {
    /** Basic view styles */
    width: props.w,
    height: props.h,
    flex: props.flex,
    flexDirection: props.flexDirection,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    backgroundColor: props.background && props.theme.colors[props.background].background,
    borderRadius: props.br,
  }

  /** Conditionally spread props down to the View as styles */
  const styles: ViewStyle = {
    ...BaseStyles,
    ...(props.dividerBottom ? DividerBottomStyles : {}),
    ...(props.dividerTop ? DividerTopStyles : {}),
    ...(props.borderColor ? { borderColor: props.borderColor } : {}),
    ...(props.borderWidth ? { borderWidth: props.borderWidth } : {}),
    ...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}),
    ...(props.debugBorder ? { borderWidth: 1, borderColor: 'red' } : {}),
    ...(props.b !== undefined ? { position: 'absolute', bottom: props.b, width: '100%' } : {}),
    ...(props.r !== undefined ? { position: 'absolute', bottom: props.r, width: '100%' } : {}),
    ...(props.disabled ? { opacity: 0.5 } : {}),
    ...(props.shadow
      ? {
        elevation: props.shadow * 10,
        shadowColor: '#ffffff',
        shadowOpacity: 0.2,
        shadowRadius: props.shadow * 5,
        backgroundColor: props.backgroundColor
          ? props.background && props.theme.colors[props.background].background
          : '#ffffff',
      }
      : {}),

    /** Margins */
    margin: typeof props.margin === 'boolean' ? props.theme.spacing.default : props.margin,
    marginBottom: typeof props.marginBottom === 'boolean' ? props.theme.spacing.default : props.marginBottom,
    marginTop: typeof props.marginTop === 'boolean' ? props.theme.spacing.default : props.marginTop,
    marginLeft: typeof props.marginLeft === 'boolean' ? props.theme.spacing.default : props.marginLeft,
    marginRight: typeof props.marginRight === 'boolean' ? props.theme.spacing.default : props.marginRight,

    /** Paddings */
    padding: typeof props.padding === 'boolean' ? props.theme.spacing.default : props.padding,
    paddingHorizontal:
      typeof props.paddingHorizontal === 'boolean' ? props.theme.spacing.default : props.paddingHorizontal,

    paddingBottom:
      typeof props.paddingBottom === 'boolean' ? props.theme.spacing.default : props.paddingBottom,
    paddingTop: typeof props.paddingTop === 'boolean' ? props.theme.spacing.default : props.paddingTop,
    paddingLeft: typeof props.paddingLeft === 'boolean' ? props.theme.spacing.default : props.paddingLeft,
    paddingRight: typeof props.paddingRight === 'boolean' ? props.theme.spacing.default : props.paddingRight,

    /** Viewstyle props will overide all options */
    ...(props.viewStyle ? { ...props.viewStyle } : {}),
  }

  return (
    <View testID={props.testID} style={styles} pointerEvents={props.disabled ? 'none' : 'auto'}>
      {props.children}
    </View>
  )
}

export default withTheme(Container)
