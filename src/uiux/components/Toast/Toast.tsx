import React, { useState, useEffect } from 'react'
import { withTheme } from '../../theming'
import { Animated } from 'react-native'
import EventEmitter from 'events'

import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export const ToastEmitter = new EventEmitter()
const SHOW_TOAST = 'SHOW_TOAST'

type ToastType = 'alert' | 'info' | 'error' | 'confirm' | null

interface ToastProps {
  theme: any
}
interface ToastMessage {
  title: string
  message: string
}
interface ToastPayload extends ToastMessage {
  type: ToastType
  delay?: number
}

export const Toaster = {
  info: (title: string, message: string, delay?: number) => {
    ToastEmitter.emit(SHOW_TOAST, { title, message, type: 'info', delay })
  },
  confirm: (title: string, message: string, delay?: number) => {
    ToastEmitter.emit(SHOW_TOAST, { title, message, type: 'confirm', delay })
  },
  warn: (title: string, message: string, delay?: number) => {
    ToastEmitter.emit(SHOW_TOAST, { title, message, type: 'warn', delay })
  },
  error: (title: string, message: string, delay?: number) => {
    ToastEmitter.emit(SHOW_TOAST, { title, message, type: 'error', delay })
  },
}

const Toast: React.FC<ToastProps> = props => {
  /**
   * Define state for Toast
   */
  const [animatedValue] = useState(new Animated.Value(0))
  const [type, updateType] = useState<ToastType>()
  const [content, updateContent] = useState<ToastMessage>({ title: '', message: '' })

  /**
   * Hide the toast after a specified time
   */
  const hideToast = (delay: number) => {
    Animated.timing(animatedValue, {
      delay,
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  /**
   * Show toast message
   */
  const showToast = (payload: ToastPayload) => {
    updateType(payload.type)
    updateContent({
      title: payload.title,
      message: payload.message,
    })

    Animated.spring(animatedValue, {
      toValue: 1,
      speed: 14,
      useNativeDriver: true,
    }).start(() => hideToast(payload.delay ? payload.delay : props.theme.delays.toasts))
  }

  const listener = (payload: ToastPayload) => showToast(payload)

  /**
   * Set up listener when component renders
   */
  useEffect(() => {
    ToastEmitter.addListener(SHOW_TOAST, listener)

    // Remove event listener on cleanup
    return () => {
      ToastEmitter.removeListener(SHOW_TOAST, listener)
    }
  }, [])

  const position = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 50],
  })

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.95],
  })

  return (
    <Animated.View
      testID={'TOAST_WRAPPER'}
      style={{
        transform: [{ translateY: position }],
        opacity,
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 10,
        right: 10,
        backgroundColor: type ? props.theme.colors.theme[type.toUpperCase()] : props.theme.colors.theme.INFO,
        borderRadius: props.theme.roundedCorners.toasts,
      }}
    >
      <Container padding={12} alignItems={'center'} justifyContent={'center'} br={5} flexDirection={'row'}>
        <Container>
          <Icon icon={props.theme.icons[type ? type.toUpperCase() : 'INFO']} color={'#FFFFFF'} />
        </Container>
        <Container flex={1} marginLeft={10}>
          <Text type={TextTypes.H5} textColor={'white'} bold={true}>
            {content.title}
          </Text>
          <Text textColor={'white'}>{content.message}</Text>
        </Container>
        <Container>
          <Button
            testID={'TOAST_CLOSE_BTN'}
            iconButton={true}
            icon={<Icon icon={props.theme.icons.CLOSE} color={'#FFFFFF'} />}
            onPress={() => hideToast(0)}
          />
        </Container>
      </Container>
    </Animated.View>
  )
}

export default withTheme(Toast)
