import React from 'react'
import { render, act } from 'react-native-testing-library'
import OverlayComponent, { OverlayEmitter } from '../Overlay'
import { Animated } from 'react-native'

const mockedAnimatedTiming = Animated.timing

jest.useFakeTimers()
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('Component(assert): Toast', () => {
  const stopAnimation = jest.fn()
  const mockEvent: any = {}
  const timing = jest.spyOn(Animated, 'timing').mockImplementation((value, options) => {
    return mockedAnimatedTiming(value, {
      ...options,
      useNativeDriver: true,
    })
  })

  it('fires event to call state update methods to display overlay', () => {
    OverlayEmitter.addListener = jest.fn((event, cb): any => {
      mockEvent[event] = cb
    })
    const { getByText } = render(<OverlayComponent />)

    /** Update the state of the toast by firing an event */
    act(() => {
      mockEvent.SHOW_OVERLAY({
        title: 'Title',
        message: 'Message',
        icon: { name: 'ios-heart', iconFamily: 'Ionicons' },
        delay: 300,
      })
    })
    expect(timing).toHaveBeenCalled()
    expect(getByText(/Title/i)).toBeDefined()

    setTimeout(() => {
      expect(stopAnimation).toHaveBeenCalled()
    }, 300)
  })

  it('sets up an event listener on render', () => {
    OverlayEmitter.addListener = jest.fn()
    render(<OverlayComponent />)

    expect(OverlayEmitter.addListener).toHaveBeenCalled()
  })

  it('removes event listener on unmount', () => {
    OverlayEmitter.removeListener = jest.fn()
    const { unmount } = render(<OverlayComponent />)
    unmount()

    expect(OverlayEmitter.removeListener).toHaveBeenCalled()
  })
})
