import React from 'react'
import { render } from 'react-native-testing-library'

import Button from '../Button'

describe('Component(snapshots): Button', () => {
  it('renders a filled button correctly with all props', () => {
    const onPress = jest.fn()
    const tree = render(
      <Button
        type={'primary'}
        block={'filled'}
        bold={true}
        fullWidth={true}
        centered={true}
        onPress={onPress}
        icon={<React.Fragment />}
        noPadding={true}
        textDecorationLine={'none'}
        testID={'TEST_ID'}
        shadowOpacity={0.5}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders an outlined button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} block={'outlined'} icon={<React.Fragment />} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders small button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} small={true} icon={<React.Fragment />} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders an outlined button correctly with a type', () => {
    const onPress = jest.fn()
    const tree = render(
      <Button type={'primary'} onPress={onPress} block={'outlined'} icon={<React.Fragment />} />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders an icon button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} icon={<React.Fragment />} iconButton={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a nav button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} navButton={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} disabled={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled nav button correctly', () => {
    const onPress = jest.fn()
    const tree = render(<Button onPress={onPress} disabled={true} navButton={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
