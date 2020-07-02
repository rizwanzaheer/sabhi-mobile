import React from 'react'
import { render, act, fireEvent } from 'react-native-testing-library'
import Toast, { Toaster, ToastEmitter } from '../Toast'
import { Animated } from 'react-native'

jest.useFakeTimers()
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(assert): Toast', () => {
  const stopAnimation = jest.fn()
  const mockEvent: any = {}
  Animated.spring = jest.fn().mockReturnValue({
    start: (callback: any = stopAnimation) => {
      callback()
    },
    stop: () => stopAnimation,
  })

  it('fires event to call state update methods to display toast', () => {
    ToastEmitter.addListener = jest.fn((event, cb): any => {
      mockEvent[event] = cb
    })
    const { getByText, getByTestId } = render(<Toast />)

    /** Update the state of the toast by firing an event */
    act(() => {
      mockEvent.SHOW_TOAST({ title: 'Title', message: 'Message', type: 'info', delay: 300 })
    })

    /** Expect */
    expect(Animated.spring).toBeCalled()
    expect(getByText(/Title/i)).toBeDefined()
    expect(getByText(/Message/i)).toBeDefined()
    expect(getByTestId('TOAST_CLOSE_BTN')).toBeDefined()

    /** Manually close the toast */
    fireEvent.press(getByTestId('TOAST_CLOSE_BTN'))

    /** Allow some time for the toast to close */
    setTimeout(() => {
      expect(getByText(/Title/i)).not.toBeDefined()
    }, 300)

    /** Update the state of the toast by firing an event. This time without a delay */
    act(() => {
      mockEvent.SHOW_TOAST({ title: 'New Title', message: 'Default delay', type: 'info' })
    })

    expect(getByText(/New Title/i)).toBeDefined()
  })

  it('sets up an event listener on render', () => {
    ToastEmitter.addListener = jest.fn()
    render(<Toast />)

    expect(ToastEmitter.addListener).toHaveBeenCalled()
  })

  it('removes event listener on unmount', () => {
    ToastEmitter.removeListener = jest.fn()
    const { unmount } = render(<Toast />)
    unmount()

    expect(ToastEmitter.removeListener).toHaveBeenCalled()
  })

  it('fires the event emitter for confirm', () => {
    ToastEmitter.emit = jest.fn()
    Toaster.confirm('Title', 'Content')

    expect(ToastEmitter.emit).toHaveBeenCalled()
  })

  it('fires the event emitter for info', () => {
    ToastEmitter.emit = jest.fn()
    Toaster.info('Title', 'Content')

    expect(ToastEmitter.emit).toHaveBeenCalled()
  })

  it('fires the event emitter for warn', () => {
    ToastEmitter.emit = jest.fn()
    Toaster.warn('Title', 'Content')

    expect(ToastEmitter.emit).toHaveBeenCalled()
  })

  it('fires the event emitter for error', () => {
    ToastEmitter.emit = jest.fn()
    Toaster.error('Title', 'Content')

    expect(ToastEmitter.emit).toHaveBeenCalled()
  })
})
