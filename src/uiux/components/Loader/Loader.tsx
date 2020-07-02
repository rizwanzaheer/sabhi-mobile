import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import Container from '../Container/Container'
import Text from '../Text/Text'
import Device from '../../services/device'

interface LoaderProps {
  bottom?: number
  left?: number
  zIndex?: number
  text?: string
  width?: number
  size?: number | 'large' | 'small' | undefined
}

const Loader: React.FC<LoaderProps> = ({ bottom, left, zIndex, text, width, size }) => {
  const defaultWidth = 200

  return (
    <Container
      flexDirection={'row'}
      alignItems={'center'}
      padding={10}
      br={20}
      viewStyle={{
        position: 'absolute',
        bottom: bottom || 50,
        zIndex: zIndex || 500,
        left: left || Device.width / 2 - (width || defaultWidth) / 2,
        width: width || defaultWidth,
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <Container marginRight={10}>
        <ActivityIndicator size={size} />
      </Container>
      {text && <Text textColor={'#ffffff'}>{text}</Text>}
    </Container>
  )
}

export default Loader
