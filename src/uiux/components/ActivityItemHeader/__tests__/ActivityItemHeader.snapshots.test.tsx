import * as React from 'react'
import { render } from 'react-native-testing-library'
import ActivityHeader from '../ActivityItemHeader'

describe('Component(snapshots): ActivityHeader', () => {
  const action = jest.fn()
  const viewer = {
    did: 'ethr:did:123456789',
    shortId: 'Test Viewer',
    profileImage: 'http://',
  }
  const baseProps = {
    id: 'ZFGHFSJD',
    date: 123445678910,
    issuer: {
      name: 'Test Issuer',
      did: 'ethr:did:123456',
      avatar: { uri: 'http://' },
      shortId: 'Test Issuer',
    },
    subject: {
      name: 'Test Subject',
      did: 'ethr:did:123456',
      avatar: { uri: 'http://' },
      shortId: 'Test Name',
    },
    profileAction: action,
  }

  it('should render incoming true with reason', () => {
    const tree = render(
      <ActivityHeader viewer={viewer} reason={'to test the components'} {...baseProps} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render incoming false with reason', () => {
    const tree = render(
      <ActivityHeader viewer={viewer} reason={'to test the components'} {...baseProps} />,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render incoming true without reason', () => {
    const tree = render(<ActivityHeader viewer={viewer} {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render incoming false without reason', () => {
    const tree = render(<ActivityHeader viewer={viewer} {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
