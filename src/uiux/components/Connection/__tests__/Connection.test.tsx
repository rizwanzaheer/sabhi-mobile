import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import Connection from '../Connection'

// onPress: () => void
// did: string
// isManaged: boolean
// shortId: string
// profileImage?: string
// theme: any

describe('Component(snapshot): Connection', () => {
  it('should render with basic shortId', () => {
    const onPress = jest.fn()
    const tree = render(
      <Connection
        onPress={onPress}
        did={'did:ethr:0x1fcc123ee34812db4bec937d7acdc7ca61d990a6'}
        isManaged={false}
        shortId={'did:ethr:0x1fcc...90a6'}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with custom shortId and profileImage', () => {
    const onPress = jest.fn()
    const tree = render(
      <Connection
        onPress={onPress}
        did={'did:ethr:0x1fcc123ee34812db4bec937d7acdc7ca61d990a6'}
        isManaged={true}
        shortId={'Sarah'}
        profileImage={'http://'}
      />,
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('should call onPress when tapped', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Connection
        onPress={onPress}
        did={'did:ethr:0x1fcc123ee34812db4bec937d7acdc7ca61d990a6'}
        isManaged={true}
        shortId={'Sarah'}
        profileImage={'http://'}
      />,
    )

    fireEvent.press(getByText(/Sarah/i))
    expect(onPress).toHaveBeenCalled()
  })
})
