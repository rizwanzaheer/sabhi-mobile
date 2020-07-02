import * as React from 'react'
import { render } from 'react-native-testing-library'
import Section from '../Section'

describe('Component(snapshot): Section', () => {
  it('should render with no props', () => {
    const tree = render(<Section />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with just a title', () => {
    const tree = render(<Section title={'Section title'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const tree = render(
      <Section
        title={'Section title'}
        noTopBorder={true}
        noTopMargin={true}
        sectionTitleType={'sectionHeader'}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
