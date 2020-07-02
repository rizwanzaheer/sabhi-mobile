import React from 'react'
import { render } from 'react-native-testing-library'
import Toast from '../Toast'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshot): Toast', () => {
  it('renders correctly with no props', () => {
    const tree = render(<Toast />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
