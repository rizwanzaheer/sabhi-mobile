import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import ActivityHeader from '../ActivityItemHeader'

describe('Component(assert): ActivityHeader', () => {
  const action = jest.fn()
  const baseProps = {
    id: 'ZFGHFSJD',
    date: 123445678910,
    profileAction: action,
  }
  const viewer = {
    did: 'ethr:did:123456789',
    shortId: 'Test Viewer',
    profileImage: 'http://',
  }
  const subject = {
    name: 'subject',
    did: 'ethr:did:123456',
    avatar: { uri: 'http://' },
    shortId: 'Test Subject',
  }
  const issuer = {
    did: 'ethr:did:123456',
    shortId: 'Test Issuer',
    profileImage: 'http://',
  }

  it('should call profile action when pressed (with reason)', () => {
    const { getByText } = render(
      <ActivityHeader
        viewer={viewer}
        issuer={issuer}
        subject={subject}
        reason={'to test the components'}
        {...baseProps}
      />,
    )
    fireEvent.press(getByText(/Test Issuer/i))
    expect(action).toBeCalled()
  })

  it('should call profile action when pressed', () => {
    const { getByText } = render(
      <ActivityHeader viewer={viewer} issuer={issuer} subject={subject} {...baseProps} />,
    )

    fireEvent.press(getByText(/Test Issuer/i))
    expect(action).toBeCalled()
  })

  it('should call profile action when pressed when viewer is issuer', () => {
    const { getByText } = render(
      <ActivityHeader viewer={viewer} issuer={viewer} subject={subject} {...baseProps} />,
    )

    fireEvent.press(getByText(/You/i))
    expect(action).toBeCalled()
  })

  it('should call profile action when pressed when viewer is subject', () => {
    const { getByText } = render(
      <ActivityHeader viewer={viewer} issuer={issuer} subject={viewer} {...baseProps} />,
    )

    fireEvent.press(getByText(/you/i))
    expect(action).toBeCalled()
  })
})
