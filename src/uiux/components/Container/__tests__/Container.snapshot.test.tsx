import React from 'react'
import { render } from 'react-native-testing-library'

import Container from '../Container'

describe('Container', () => {
  it('renders correctly with all props', () => {
    const tree = render(
      <Container
        testID="CONTAINER_TEST_ID"
        w={100}
        h={100}
        br={5}
        flex={1}
        flexDirection={'row'}
        backgroundColor={'#ffffff'}
        background={'primary'}
        alignItems={'center'}
        justifyContent={'center'}
        dividerBottom={true}
        dividerTop={true}
        margin={true}
        marginBottom={true}
        marginLeft={true}
        marginRight={true}
        marginTop={true}
        paddingBottom={true}
        paddingTop={true}
        paddingLeft={true}
        paddingRight={true}
        debugBorder={true}
        debugBorderColor={'#000000'}
        shadow={5}
        opacity={0.6}
        borderColor={'#000000'}
        borderWidth={2}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with shorthand props', () => {
    const tree = render(<Container padding={true} paddingHorizontal={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders shadow with background', () => {
    const tree = render(<Container shadow={4} background={'primary'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders shadow with backgroundColor', () => {
    const tree = render(<Container shadow={4} backgroundColor={'#ffffff'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with value props', () => {
    const tree = render(
      <Container
        margin={10}
        marginBottom={10}
        marginRight={10}
        marginTop={10}
        marginLeft={10}
        paddingBottom={10}
        paddingHorizontal={10}
        paddingLeft={10}
        paddingRight={10}
        paddingTop={10}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with custom viewStyle', () => {
    const tree = render(<Container viewStyle={{ flex: 1, margin: 10 }} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with absolute positioning', () => {
    const tree = render(<Container b={100} r={20} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with pointer events disabled', () => {
    const tree = render(<Container disabled={true} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
