import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'

import Text from '../Text'

describe('Component(assert): Text', () => {
  it('renders correctly with no props', () => {
    const onPress = jest.fn()
    const { getByText } = render(<Text onPress={onPress}>Hello World</Text>)

    fireEvent.press(getByText(/Hello World/i))
    expect(onPress).toHaveBeenCalled()
  })
})
