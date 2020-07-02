import * as React from 'react'
import { TouchableHighlight } from 'react-native'
import Text from '../Text/Text'
import Container from '../Container/Container'
import Icon from '../Icon/Icon'
import { withTheme } from '../../theming'
import hexToRgba from 'hex-to-rgba'

interface MenuItem {
  /**
   * onPress function
   */
  onPress: () => void

  /**
   * Show item as active
   */
  active?: boolean

  /**
   * Provide an left icon
   */
  icon?: {
    name: string
    iconFamily: string
  }

  /**
   * Provide testID
   */
  testID?: string

  /**
   * Provided by HOC
   */
  theme: any
}

const MenuItem: React.FC<MenuItem> = props => {
  return (
    <TouchableHighlight
      style={{
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: props.theme.colors.primary.background,
      }}
      onPress={props.onPress}
      testID={props.testID}
      accessibilityLabel={props.testID}
      underlayColor={hexToRgba(props.theme.colors.primary.accessories, 0.2)}
    >
      <Container
        viewStyle={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        backgroundColor={
          props.active
            ? hexToRgba(props.theme.colors.primary.brand, 0.1)
            : hexToRgba(props.theme.colors.primary.background, 0.1)
        }
        flexDirection={'row'}
        paddingLeft={true}
        paddingTop={10}
        paddingBottom={10}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {props.icon && (
          <Container>
            <Icon
              icon={props.icon}
              size={18}
              color={props.active ? props.theme.colors.primary.brand : props.theme.colors.primary.text}
            />
          </Container>
        )}
        <Container flex={1} paddingLeft={true}>
          <Text textColor={props.active && props.theme.colors.primary.brand}>{props.children}</Text>
        </Container>
      </Container>
    </TouchableHighlight>
  )
}

export default withTheme(MenuItem)
