import * as React from 'react'
import { ViewStyle } from 'react-native'
import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import { withTheme } from '../../theming'

interface IndicatorBarProps {
  /**
   * Indicator text
   */
  text: string

  /**
   * Indicator background
   */
  backgroundColor?: string

  /**
   * Theming
   */
  theme: any
}

const IndicatorBar: React.FC<IndicatorBarProps> = ({ text, backgroundColor, theme }) => {
  const triangle: ViewStyle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: backgroundColor ? backgroundColor : '#222222',
    transform: [{ rotate: '180deg' }],
  }

  return (
    <Container backgroundColor={theme.colors.primary.background}>
      <Container backgroundColor={backgroundColor ? backgroundColor : '#222222'} padding={true}>
        <Text textColor={'#FFFFFF'} type={TextTypes.SectionHeader} textAlign={'center'}>
          {text}
        </Text>
      </Container>
      <Container alignItems={'center'}>
        <Container viewStyle={triangle} />
      </Container>
    </Container>
  )
}

export default withTheme(IndicatorBar)
