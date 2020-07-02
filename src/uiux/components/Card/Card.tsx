import * as React from 'react'
import { TouchableHighlight, ViewStyle } from 'react-native'
import Container from '../Container/Container'
import * as Kancha from '../../types'
import { withTheme } from '../../theming'
import Device from '../../services/device'

interface CardProps {
  onPress?: () => void
  shadow?: number
  br?: number
  testID?: string
  background?: Kancha.BrandPropOptions
  marginBottom?: number
  theme: any
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  shadow,
  br,
  background,
  theme,
  testID,
  marginBottom,
}) => {
  const style: ViewStyle = {
    borderRadius: br || 5,
    ...(Device.isAndroid ? { marginRight: 8 } : {}),
    backgroundColor: background && theme.colors[background].background,
    marginBottom: marginBottom || theme.spacing.default,
    ...(shadow
      ? {
          shadowColor: '#000000',
          shadowRadius: shadow * 4,
          shadowOpacity: shadow / 15,
          elevation: 5,
        }
      : {}),
  }
  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={!onPress}
      testID={testID}
      style={style}
      underlayColor={'transparent'}
    >
      <Container padding={true} marginBottom={true}>
        {children}
      </Container>
    </TouchableHighlight>
  )
}

export default withTheme(Card)
