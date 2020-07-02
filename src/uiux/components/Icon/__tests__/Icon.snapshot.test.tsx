import * as React from 'react'
import { render } from 'react-native-testing-library'
import Icon from '../Icon'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshots): Icon', () => {
  it('should render with required props', () => {
    const ICON = {
      name: 'ios-alert',
      iconFamily: 'Ionicons',
    }
    const tree = render(<Icon icon={ICON} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with all props', () => {
    const ICON = {
      name: 'ios-alert',
      iconFamily: 'Ionicons',
    }
    const tree = render(<Icon icon={ICON} size={20} color={'#FAFAFA'} />)

    expect(tree).toMatchSnapshot()
  })
})
