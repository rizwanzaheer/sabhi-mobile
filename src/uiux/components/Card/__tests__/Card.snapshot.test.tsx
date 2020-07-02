import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import Card from '../Card'
import Device from '../../../services/device'

describe('Component(snapshot): Card', () => {
  it('should render with default props - Android', () => {
    Device.isAndroid = true
    const tree = render(<Card />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with default props', () => {
    const tree = render(<Card />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const onPress = jest.fn()
    const tree = render(<Card onPress={onPress} shadow={0.3} br={10} marginBottom={10} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should fire tap event on card when onPress is passed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(<Card onPress={onPress} testID={'CARD_BTN'} />)

    fireEvent.press(getByTestId('CARD_BTN'))
    expect(onPress).toHaveBeenCalled()
  })
})
