import * as React from 'react'
import { render, fireEvent, act } from 'react-native-testing-library'
import InlineCredentialInput from '../InlineCredential'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

describe('Component(snapshots): Inline Credential', () => {
  it('should render with required props', () => {
    const onCreate = jest.fn()
    const tree = render(<InlineCredentialInput claimType={'TEST_CLAIM'} onCreate={onCreate} />)

    expect(tree).toMatchSnapshot()
  })

  it('should fire submit event', () => {
    const onCreate = jest.fn()
    const tree = render(<InlineCredentialInput claimType={'TEST_CLAIM'} onCreate={onCreate} />)

    act(() => {
      fireEvent.changeText(tree.getByTestId('inline_credential_input'), 'TEST_CLAIM_VALUE')
    })

    fireEvent.press(tree.getByTestId('inline_credential_submit'))

    expect(onCreate).toBeCalledWith('TEST_CLAIM_VALUE')
    expect(tree).toMatchSnapshot()
  })
})
