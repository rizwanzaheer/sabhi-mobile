import * as React from 'react'
import { render } from 'react-native-testing-library'
import AccordionItem from '../AccordionItem'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshot): Accordion Item', () => {
  it('should render children text', () => {
    const { getByText } = render(<AccordionItem>Accordion Item</AccordionItem>)

    expect(getByText(/Accordion Item/i)).toBeDefined()
  })
})
