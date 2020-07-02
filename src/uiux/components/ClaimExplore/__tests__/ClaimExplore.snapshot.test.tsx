import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import ClaimExplore from '../ClaimExplore'
import { startOfYesterday, getTime } from 'date-fns'
import { act } from 'react-test-renderer'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const rootClaim = {
  name: 'Sarah Adamson',
  dateOfBirth: '22-01-75',
  country: 'USA',
  children: [
    {
      name: 'Bob',
      age: 4,
    },
    {
      name: 'Alice',
      age: 9,
    },
  ],
}

const claim = {
  'Serto ID': {
    name: 'Sarah Adamson',
    dateOfBirth: '22-01-75',
    country: 'USA',
    pets: ['fish', 'cats', 'birds'],
    address: {
      houseNumber: 22,
      streetName: 'Privacy Ville',
    },
    children: [
      {
        name: 'Bob',
        age: 4,
      },
      {
        name: 'Alice',
        pets: ['fish', 'cats', 'horses'],
        age: 9,
      },
    ],
  },
}

describe('Component(snapshot): Claim Accordion Explorer', () => {
  it('should render with default props', () => {
    const tree = render(<ClaimExplore claim={claim} exp={1573235796610} revoked={false} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with valid jwt', () => {
    const tree = render(
      <ClaimExplore
        claim={rootClaim}
        jwt={jwt}
        qrText={'Scan QR code to verify'}
        exp={1573235796610}
        revoked={false}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with invalid valid jwt', () => {
    const tree = render(
      <ClaimExplore
        claim={rootClaim}
        jwt={jwt}
        qrText={'Scan QR code to verify'}
        exp={getTime(startOfYesterday())}
        revoked={true}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render QRCode with invalid valid message', () => {
    const tree = render(
      <ClaimExplore
        claim={rootClaim}
        jwt={jwt}
        qrText={'Scan QR code to verify'}
        exp={getTime(startOfYesterday())}
        revoked={true}
      />,
    )
    const { getByTestId } = tree
    const toggleBtn = getByTestId('QR_TOGGLE_BTN')

    act(() => {
      fireEvent.press(toggleBtn)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
