import * as React from 'react'
import { render, fireEvent, act } from 'react-native-testing-library'
import RequestItem from '../RequestItem'

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

const baseVc = {
  jwt: '001',
  iss: { shortId: 'Serto Issuer', did: '0xfksksdkeprgj' },
  sub: { shortId: 'Sert User', did: '0xwrhfowiehrf' },
  type: '',
  iat: 123455678,
  exp: 123455678,
  nbf: 123455678,
}

const singleOptionCredential_01 = {
  ...baseVc,
  hash: '001',
  parentHash: '00001',
  fields: [
    {
      type: 'name',
      value: 'Single Option A',
      isObj: false,
    },
  ],
}

const singleOptionCredential_02 = {
  ...baseVc,
  hash: '002',
  parentHash: '00002',
  fields: [
    {
      type: 'name',
      value: 'Single Option B',
      isObj: false,
    },
  ],
}

describe('Component(assert): RequestItem', () => {
  it('should display as `not shared` when credential is not required', () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <RequestItem
        claimType={'name'}
        reason={'A test reason'}
        credentials={[singleOptionCredential_01, singleOptionCredential_02]}
        onSelectItem={onSelect}
      />,
    )

    expect(getByText(/Not Shared/i)).toBeDefined()
  })

  it('should open accordion when pressed and display options', () => {
    const onSelect = jest.fn()
    const { getByText, getAllByText } = render(
      <RequestItem
        closeAfterSelect={false}
        claimType={'name'}
        reason={'A test reason'}
        credentials={[singleOptionCredential_01, singleOptionCredential_02]}
        onSelectItem={onSelect}
      />,
    )

    act(() => {
      fireEvent.press(getByText(/Not Shared/i))
    })

    expect(getByText(/Do not share/i)).toBeDefined()
    expect(getByText(/A test reason/i)).toBeDefined()
    expect(getAllByText(/Single Option A/i)).toHaveLength(2)
  })

  it('should fire the event to open accordion, select options and stay open', () => {
    const onSelect = jest.fn()
    const { getByText, getAllByText } = render(
      <RequestItem
        claimType={'name'}
        credentials={[singleOptionCredential_01, singleOptionCredential_02]}
        closeAfterSelect={false}
        required={true}
        onSelectItem={onSelect}
      />,
    )

    expect(getAllByText(/Single Option A/i)).toHaveLength(1)

    act(() => {
      fireEvent.press(getByText(/Single Option A/i))
    })

    expect(getAllByText(/Single Option A/i)).toHaveLength(3)

    act(() => {
      fireEvent.press(getAllByText(/Single Option B/i)[0])
    })

    expect(getAllByText(/Single Option B/i)).toHaveLength(3)
    expect(getAllByText(/Single Option A/i)).toHaveLength(2)
  })
})
