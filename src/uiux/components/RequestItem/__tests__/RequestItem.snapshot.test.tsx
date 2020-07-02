import * as React from 'react'
import { render } from 'react-native-testing-library'
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

describe('Component(snapshot): RequestItem', () => {
  it('should render required with options', () => {
    const onSelect = jest.fn()
    const tree = render(
      <RequestItem
        required
        claimType={'name'}
        reason={'A test reason'}
        credentials={[singleOptionCredential_01, singleOptionCredential_02]}
        onSelectItem={onSelect}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render un-required with single option', () => {
    const onSelect = jest.fn()
    const tree = render(
      <RequestItem
        claimType={'name'}
        reason={'A test reason'}
        credentials={[singleOptionCredential_01]}
        onSelectItem={onSelect}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render un-required with multi options', () => {
    const onSelect = jest.fn()
    const selfSign = jest.fn()
    const tree = render(
      <RequestItem
        selfSign={selfSign}
        claimType={'name'}
        reason={'A test reason'}
        credentials={[singleOptionCredential_01, singleOptionCredential_02]}
        onSelectItem={onSelect}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
