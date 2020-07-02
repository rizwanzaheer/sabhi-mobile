import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import FabButton from '../FabButton'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(assert): FabButton', () => {
  it('should call a function when tapped', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(<FabButton testID={'test_fab_button'} onPress={onPress} />)

    fireEvent.press(getByTestId('test_fab_button'))
    expect(onPress).toHaveBeenCalled()
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
