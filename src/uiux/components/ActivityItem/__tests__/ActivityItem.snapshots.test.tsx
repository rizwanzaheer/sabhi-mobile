import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import ActivityItem from '../ActivityItem'

const ATTACHMENT_1 = {
  hash: '01',
  jwt: '01',
  exp: 123445678910,
  sub: { shortId: 'Test Subject 1', did: '0x1efghssesd', profileImage: '' },
  iss: { shortId: 'Test Issuer 1', did: '0x1efgh', profileImage: '' },
  fields: [
    {
      type: 'name',
      value: 'Test name',
    },
    {
      type: 'phone',
      value: 'Test phone',
    },
  ],
}

const ATTACHMENT_2 = {
  hash: '01',
  jwt: '01',
  sub: { shortId: 'Test Subject 2', did: '0x1efghssesdss', profileImage: '' },
  iss: { shortId: 'Test Issuer 2', did: '0x1efghssss', profileImage: '' },
  fields: [
    {
      type: 'name',
      value: 'Test name',
    },
    {
      type: 'phone',
      value: 'Test phone',
    },
  ],
}

describe('Component(snapshots): ActivityItem', () => {
  const viewer = {
    did: 'ethr:did:123456876',
    profileImage: 'http://',
    shortId: 'Test Viewer',
  }
  const baseProps = {
    id: 'ZFGHFSJD',
    date: 123445678910,
    type: 'w3c.vc',
    sender: {
      did: 'ethr:did:123456',
      profileImage: 'http://',
      shortId: 'Test Issuer',
    },
    receiver: {
      did: 'ethr:did:123456',
      profileImage: 'http://',
      shortId: 'Test Subject',
    },
    activity: 'testing the components',
    profileAction: () => {},
  }

  it('should render with default required props', () => {
    const tree = render(<ActivityItem viewer={viewer} {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render with attachments', () => {
    const attachments = [ATTACHMENT_1, ATTACHMENT_2]

    const tree = render(<ActivityItem viewer={viewer} attachments={attachments} {...baseProps} />)
    expect(tree.toJSON).toMatchSnapshot()
  })

  it('should render with actions', () => {
    const actions = ['Confirm', 'Reject']
    const confirm = jest.fn()
    const reject = jest.fn()

    const tree = render(
      <ActivityItem
        {...baseProps}
        type={'sdr'}
        viewer={viewer}
        actions={actions}
        confirm={confirm}
        reject={reject}
      />,
    )
    expect(tree.toJSON).toMatchSnapshot()

    fireEvent.press(tree.getByText(/Confirm/i))
    expect(confirm).toHaveBeenCalled()

    fireEvent.press(tree.getByText(/Reject/i))
    expect(reject).toHaveBeenCalled()
  })
})
