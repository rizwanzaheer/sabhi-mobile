import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'

import Button, { ButtonBlocks } from '../Button'

describe('Component(assert): Button', () => {
  it('should render text in a button', () => {
    const pressedButton = jest.fn()
    const { getByText } = render(
      <Button onPress={() => pressedButton()} buttonText={'Press Me'} block={ButtonBlocks.Filled} />,
    )
    expect(getByText(/Press Me/i)).toBeDefined()
  })

  it('should render a nav button', () => {
    const pressedButton = jest.fn()
    const { getByText } = render(
      <Button navButton={true} onPress={() => pressedButton()} buttonText={'Nav Button'} />,
    )
    expect(getByText(/Nav Button/i)).toBeDefined()
  })

  it('should fire onPress event', () => {
    const pressedButton = jest.fn()
    const { getByTestId } = render(
      <Button testID="button" onPress={() => pressedButton()} buttonText={'Press Me'} />,
    )
    fireEvent.press(getByTestId('button'))
    expect(pressedButton).toHaveBeenCalled()
  })

  it('should fire onPress event from nav button', () => {
    const pressedButton = jest.fn()
    const { getByTestId } = render(
      <Button navButton={true} testID="button" onPress={() => pressedButton()} buttonText={'Press Me'} />,
    )
    fireEvent.press(getByTestId('button'))
    expect(pressedButton).toHaveBeenCalled()
  })
})
