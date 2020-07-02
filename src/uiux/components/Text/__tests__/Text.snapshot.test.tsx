import React from 'react'
import { render } from 'react-native-testing-library'

import Text, { TextTypes } from '../Text'

describe('Component(snapshops): Text', () => {
  it('renders correctly with no props', () => {
    const tree = render(<Text>Hello World</Text>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with default padding bottom', () => {
    const tree = render(<Text paddingBottom={true}>Hello World</Text>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with all props', () => {
    const tree = render(
      <Text
        type={TextTypes.H1}
        warn={true}
        buttonTextColor={'primary'}
        textColor={'#ffffff'}
        block={'filled'}
        bold={true}
        padding={5}
        paddingBottom={10}
        margin={5}
        textAlign={'center'}
        textDecorationLine={'none'}
        transform={'uppercase'}
        textStyle={{ opacity: 0.9 }}
        selectable={true}
      >
        Hello World
      </Text>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
