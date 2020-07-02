import * as React from 'react'
import { TouchableHighlight, TouchableOpacity, ViewStyle } from 'react-native'
import { withTheme } from '../../theming'
import * as Kancha from '../../types'
import Text, { TextTypes } from '../Text/Text'
import Container from '../Container/Container'

export const ButtonBlocks: Kancha.BlocksStatic = {
  Outlined: 'outlined',
  Filled: 'filled',
  Clear: 'clear',
}

interface ButtonProps {
  /**
   * The button type. This sets the theme color
   */
  type?: Kancha.BrandPropOptions
  /**
   * The block appearance of the button
   */
  block?: Kancha.BlockPropsOptions
  /**
   * The text to be displayed
   */
  buttonText?: string

  /**
   * The text to be displayed
   */
  bold?: boolean

  /**
   * Enable smaller button
   */
  small?: boolean

  /**
   * Remove width limitations
   */
  fullWidth?: boolean
  /**
   * The button type. This sets the theme color
   */
  onPress: () => void

  /**
   * Center the button horizontally on screen
   */
  centered?: boolean

  /**
   * Disbable the button
   */
  disabled?: boolean

  /**
   * The button is a navigation button
   */
  navButton?: boolean

  /**
   * Provide an icon component
   */
  icon?: React.ReactNode

  /**
   * Remove button padding for icon buttons
   */
  noPadding?: boolean

  /**
   * Text decoration
   */
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined

  /**
   * Provide a testID for e2e tests
   */
  testID?: string

  /**
   * Shadow
   */
  shadowOpacity?: number

  /**
   * Icon button flag
   */
  iconButton?: boolean

  /**
   * Theme used by theme provider
   */
  theme: any
}

const Button: React.FC<ButtonProps> & {
  Block: Kancha.BlocksStatic
} = ({
  type,
  block,
  fullWidth,
  onPress,
  disabled,
  buttonText,
  small,
  centered,
  bold,
  navButton,
  icon,
  noPadding,
  textDecorationLine,
  testID,
  iconButton,
  shadowOpacity,
  theme,
}) => {
  const style: ViewStyle = {
    ...(block && block === 'filled'
      ? { backgroundColor: type ? theme.colors[type].button : theme.colors.primary.button }
      : {}),
    ...(block && block === 'outlined'
      ? {
          backgroundColor: theme.colors.primary.background,
          borderWidth: 2,
          borderColor: type ? theme.colors[type].button : theme.colors.primary.button,
        }
      : {}),
    ...(noPadding || iconButton
      ? {}
      : { padding: small ? theme.spacing.default / 2 : theme.spacing.default }),
    alignItems: 'center',
    ...(fullWidth ? {} : { maxWidth: 300 }),
    borderRadius: theme.roundedCorners.buttons,
    ...(centered ? { alignSelf: 'center' } : {}),
    ...(disabled ? { opacity: 0.2 } : {}),
    ...(shadowOpacity
      ? { shadowColor: '#000000', shadowRadius: 15, shadowOpacity, elevation: shadowOpacity * 10 }
      : {}),
  }

  return navButton ? (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={testID}
    >
      <Text
        textDecorationLine={textDecorationLine}
        type={TextTypes.NavButton}
        buttonTextColor={disabled ? 'secondary' : type}
        block={block}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableHighlight
      testID={testID}
      accessibilityLabel={testID}
      disabled={disabled}
      onPress={onPress}
      style={style}
      underlayColor={
        block === ButtonBlocks.Clear || iconButton ? 'transparent' : type && theme.colors[type].underlay
      }
    >
      <Container flexDirection={'row'} justifyContent={'center'}>
        {icon && <Container marginRight={10}>{icon}</Container>}
        <Container alignItems={'center'} justifyContent={'center'}>
          <Text
            textDecorationLine={textDecorationLine}
            type={small ? TextTypes.ButtonSmall : TextTypes.Button}
            buttonTextColor={disabled ? 'secondary' : type}
            block={block}
            bold={bold}
          >
            {buttonText}
          </Text>
        </Container>
      </Container>
    </TouchableHighlight>
  )
}

Button.Block = ButtonBlocks

export default withTheme(Button)
