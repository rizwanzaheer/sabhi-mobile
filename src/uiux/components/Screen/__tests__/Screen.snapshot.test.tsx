import * as React from 'react'
import { render } from 'react-native-testing-library'
import Screen from '../Screen'
import Container from '../../Container/Container'

describe('Component(snapshots): Screen', () => {
  it('should render with no props', () => {
    const tree = render(<Screen />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const tree = render(
      <Screen
        background={'primary'}
        safeArea={true}
        safeAreaBackground="white"
        scrollEnabled={true}
        statusBarStyle={'light-content'}
        footerComponent={<Container />}
      />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should render with a custom background color', () => {
    const tree = render(<Screen backgroundColor={'#000000'} />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with no statusbar and independant safe areas', () => {
    const tree = render(
      <Screen
        statusBarHidden={true}
        safeAreaTop={true}
        safeAreaTopBackground="white"
        safeAreaBottom={true}
        safeAreaBottomBackground="white"
        backgroundImage={{ uri: 'https://theinternet.com/image.jpg' }}
      />,
    )

    expect(tree).toMatchSnapshot()
  })
})
