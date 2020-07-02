import * as React from 'react'
import { render } from 'react-native-testing-library'
import AccordionItem from '../AccordionItem'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshot): Accordion Item', () => {
  it('should render with default props', () => {
    const tree = render(<AccordionItem>Accordion Item</AccordionItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const onPress = jest.fn()
    const tree = render(
      <AccordionItem
        last={true}
        dividerBottom={true}
        subTitle={'Accordion Item Subtitle'}
        itemNote={'Note'}
        onPress={onPress}
      >
        Accordion Item
      </AccordionItem>,
    )

    expect(tree).toMatchSnapshot()
  })
})
