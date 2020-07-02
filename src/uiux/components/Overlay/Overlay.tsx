import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import Container from '../Container/Container'
import Icon from '../Icon/Icon'
import Text, { TextTypes } from '../Text/Text'
import Device from '../../services/device'
import { withTheme } from '../../theming'
import EventEmitter from 'events'

export const OverlayEmitter = new EventEmitter()
const SHOW_OVERLAY = 'SHOW_OVERLAY'

interface OverlayProps {
  theme: any
}

interface OverlayPayload {
  title: string
  message: string
  icon: any
  delay?: number
}

interface IconProps {
  name: string
  iconFamily: string
}

export const Overlay = {
  show: (title: string, message: string, icon: any, delay?: number) => {
    OverlayEmitter.emit(SHOW_OVERLAY, { title, message, icon, delay })
  },
}

const OverlayComponent: React.FC<OverlayProps> = ({ theme }) => {
  const [animatedValue] = useState(new Animated.Value(0))
  const [title, setTitle] = useState()
  const [icon, setIcon] = useState<IconProps>()

  const hideOverlay = (delay: number) => {
    Animated.timing(animatedValue, {
      delay,
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const showOverlay = (payload: OverlayPayload) => {
    const { title, icon } = payload

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => hideOverlay(payload.delay ? payload.delay : theme.delays.toasts))

    setTitle(title)
    setIcon(icon)
  }

  const listener = (payload: OverlayPayload) => showOverlay(payload)

  /**
   * Set up listener when component renders
   */
  useEffect(() => {
    OverlayEmitter.addListener(SHOW_OVERLAY, listener)

    // Remove event listener on cleanup
    return () => {
      OverlayEmitter.removeListener(SHOW_OVERLAY, listener)
    }
  }, [])

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.95],
  })

  return (
    <Animated.View
      style={{
        opacity,
        position: 'absolute',
        top: Device.height / 2 - 75,
        left: Device.width / 2 - 75,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: theme.roundedCorners.overlay,
      }}
    >
      <Container w={140} h={140} alignItems={'center'}>
        <Container viewStyle={{ position: 'absolute', top: 15 }}>
          {icon && <Icon icon={icon} size={80} />}
        </Container>
        <Container viewStyle={{ position: 'absolute', bottom: 15 }}>
          <Text type={TextTypes.SubTitle}>{title}</Text>
        </Container>
      </Container>
    </Animated.View>
  )
}

export default withTheme(OverlayComponent)
