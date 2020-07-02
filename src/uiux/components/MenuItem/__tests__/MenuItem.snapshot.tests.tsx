import * as React from 'react'
import { render } from 'react-native-testing-library'
import MenuItem from '../MenuItem'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

const Icon = {
  name: 'ios-settings',
  iconFamily: 'Ionicons',
}

describe('Component(snapshots): LogItem', () => {
  it('should render with required props', () => {
    const onPress = jest.fn()
    const tree = render(<MenuItem onPress={onPress}>Test Menu Item</MenuItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with icon', () => {
    const onPress = jest.fn()
    const tree = render(
      <MenuItem icon={Icon} onPress={onPress} testID={'TEST_MENU_ID'}>
        Test Menu Item
      </MenuItem>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render active with icon', () => {
    const onPress = jest.fn()
    const tree = render(
      <MenuItem onPress={onPress} icon={Icon} active={true}>
        Test Menu Item
      </MenuItem>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
