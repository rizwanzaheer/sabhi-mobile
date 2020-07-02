import * as React from 'react'
import { render } from 'react-native-testing-library'
import Banner from '../Banner'

describe('Component(snapshot): Banner', () => {
  it('should render with default props', () => {
    const tree = render(
      <Banner
        title={'Test Title'}
        issuer={{ did: 'ethr:did', shortId: 'Test name' }}
        subTitle={'Test Subtitle'}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with default props', () => {
    const tree = render(
      <Banner
        size={'medium'}
        issuer={{ did: 'ethr:did', shortId: 'Test name' }}
        backgroundImage={{ uri: '' }}
        backgroundColor={'#000000'}
        title={'Test Title'}
        subTitle={'Test Subtitle'}
      />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
