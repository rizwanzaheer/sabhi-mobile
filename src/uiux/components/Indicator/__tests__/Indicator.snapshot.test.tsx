import * as React from 'react'
import { render } from 'react-native-testing-library'
import Indicator from '../Indicator'

describe('Component(snapshot): Indicator', () => {
  it('renders with default props', () => {
    const tree = render(<Indicator text={'Test indicator text'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders with background color', () => {
    const tree = render(<Indicator text={'Test indicator text'} backgroundColor={'#000000'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
