import React from 'react'
import { render } from 'react-native-testing-library'
import { Text } from 'react-native'

import Container from '../Container'

describe('Component(assert): Container', () => {
  const { getByText } = render(
    <Container>
      <Text>Hello World</Text>
    </Container>,
  )

  it('should render children', () => {
    expect(getByText(/Hello World/i)).toBeDefined()
  })
})
