import * as React from 'react'
import { render } from 'react-native-testing-library'
import Indicator from '../Indicator'

describe('Component(assert): Indicator', () => {
  it('renders corrext text', () => {
    const { getByText } = render(<Indicator text={'Test indicator text'} />)

    expect(getByText(/Test indicator text/i)).toBeDefined()
  })
})
