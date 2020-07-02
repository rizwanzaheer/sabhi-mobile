import React from 'react'
import { TouchableHighlight } from 'react-native'
import Container from '../Container/Container'
import Icon from '../Icon/Icon'
import Text from '../Text/Text'
import { withTheme } from '../../theming'

interface RadioProps {
  /**
   *  Pass a test ID to button
   */
  testID?: string
  /**
   * On Press handler
   */
  onPress: () => void

  /**
   * Selected flag
   */
  selected: boolean

  /**
   * Disable the button
   */
  disabled?: boolean

  /**
   * Theme
   */
  theme: any
}

const Radio: React.FC<RadioProps> = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={'transparent'}
      disabled={props.disabled}
      testID={props.testID}
    >
      <Container flexDirection={'row'} alignItems={'center'} marginBottom={5}>
        <Icon icon={props.selected ? props.theme.icons.RADIO_ON : props.theme.icons.RADIO_OFF} />
        <Container flex={1} paddingLeft={8}>
          <Text>{props.children}</Text>
        </Container>
      </Container>
    </TouchableHighlight>
  )
}

export default withTheme(Radio)
