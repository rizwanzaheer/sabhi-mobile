import * as React from 'react'
import { render } from 'react-native-testing-library'
import ListItem from '../ListItem'
import Icon from '../../Icon/Icon'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshot): ListItem', () => {
  it('should render with no props', () => {
    const tree = render(<ListItem>List item test</ListItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with an onPress handler', () => {
    const onPress = jest.fn()
    const tree = render(<ListItem onPress={onPress}>List item test</ListItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with an external link handler', () => {
    const tree = render(<ListItem externalLink={'https://ethereum.org'}>List item test</ListItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with a left icon', () => {
    const tree = render(
      <ListItem iconLeft={<Icon icon={{ name: 'ios-menu', iconFamily: 'Ionicons' }} />}>
        List item test
      </ListItem>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render selected in edit mode', () => {
    const tree = render(<ListItem editMode={true} selected={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render in edit mode', () => {
    const tree = render(<ListItem editMode={true}>List item test</ListItem>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should hide forward arrow', () => {
    const onPress = jest.fn()
    const tree = render(
      <ListItem onPress={onPress} hideForwardArrow={true}>
        List item test
      </ListItem>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const tree = render(
      <ListItem
        last={true}
        subTitle={'Subtitle'}
        accessoryRight={'Note'}
        dividerBottom={true}
        selected={true}
      >
        List item test
      </ListItem>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
