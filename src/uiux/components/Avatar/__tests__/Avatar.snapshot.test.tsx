import * as React from 'react'
import { render } from 'react-native-testing-library'
import Avatar from '../Avatar'

describe('Component(snapshots): Avatar', () => {
  it('should render with no props', () => {
    const tree = render(<Avatar />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with source props', () => {
    const tree = render(<Avatar source={{ uri: 'somehttp-image-uri' }} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const tree = render(
      <Avatar source={{ uri: 'somehttp-image-uri' }} size={32} type={'square'} border={true} />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should render with title and background props', () => {
    const tree = render(<Avatar size={32} type={'square'} title={'Satoshi'} backgroundColor={'#000000'} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render a default gravatar icon', () => {
    const tree = render(<Avatar size={32} address={'0x0f10E18715EA6F26Cf90Fd4684FdFC8c0658F9eb'} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render a custom rounded gravatar', () => {
    const tree = render(
      <Avatar
        size={32}
        address={'0x0f10E18715EA6F26Cf90Fd4684FdFC8c0658F9eb'}
        gravatarType={'monsterid'}
        type={'rounded'}
      />,
    )

    expect(tree).toMatchSnapshot()
  })
})
