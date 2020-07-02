import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon, { IconConfig } from '../Icon/Icon'
import { withTheme } from '../../theming'

interface FabButtonProps {
  /**
   * Test ID
   */
  testID?: string

  /**
   * Button color. Defaults to brand color
   */
  color?: string

  /**
   * Shadow depth. Defaults to .3
   */
  shadowOpacity?: number

  /**
   * Icon to show
   */
  icon?: IconConfig

  /**
   * Color of icon. Defaults to primary background
   */
  iconColor?: string

  /**
   * Handler
   */
  onPress: () => void

  /**
   * Custom size
   */
  size?: number

  /**
   * Theme
   */
  theme: any
}

const FabButton: React.FC<FabButtonProps> = props => {
  const shadowStyle = {
    shadowColor: '#000000',
    shadowOpacity: props.shadowOpacity ? props.shadowOpacity : 0.3,
    shadowRadius: 20,
    elevation: props.shadowOpacity ? props.shadowOpacity * 10 : 3,
  }

  return (
    <TouchableOpacity
      accessibilityLabel={props.testID}
      testID={props.testID}
      onPress={props.onPress}
      style={{
        height: props.size || 70,
        width: props.size || 70,
        backgroundColor: props.color || props.theme.colors.primary.brand,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadowStyle,
      }}
    >
      {props.icon && (
        <Icon icon={props.icon} size={35} color={props.iconColor || props.theme.colors.primary.background} />
      )}
    </TouchableOpacity>
  )
}

export default withTheme(FabButton)
