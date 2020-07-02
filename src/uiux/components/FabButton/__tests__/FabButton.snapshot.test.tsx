import * as React from 'react'
import { render } from 'react-native-testing-library'
import FabButton from '../FabButton'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshots): FabButton', () => {
  it('should render with required props', () => {
    const onPress = jest.fn()
    const tree = render(<FabButton onPress={onPress} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with all props', () => {
    const onPress = jest.fn()
    const tree = render(
      <FabButton
        shadowOpacity={0.2}
        onPress={onPress}
        icon={{ name: 'ios-add', iconFamily: 'Ionicons' }}
        iconColor={'#000000'}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  it('should render with default color', () => {
    const onPress = jest.fn()
    const tree = render(<FabButton onPress={onPress} icon={{ name: 'ios-add', iconFamily: 'Ionicons' }} />)
    expect(tree).toMatchSnapshot()
  })
})
