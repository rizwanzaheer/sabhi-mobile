import * as React from 'react'
import { render } from 'react-native-testing-library'
import RadioBtn from '../RadioBtn'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshot): Indicator', () => {
  it('renders with default props', () => {
    const onPress = jest.fn()
    const tree = render(<RadioBtn selected={true} onPress={onPress} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders unselected', () => {
    const onPress = jest.fn()
    const tree = render(<RadioBtn selected={false} onPress={onPress} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const onPress = jest.fn()
    const tree = render(<RadioBtn selected={false} onPress={onPress} disabled={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with children text', () => {
    const onPress = jest.fn()
    const tree = render(
      <RadioBtn selected={false} onPress={onPress}>
        {'Test radio button text'}
      </RadioBtn>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
