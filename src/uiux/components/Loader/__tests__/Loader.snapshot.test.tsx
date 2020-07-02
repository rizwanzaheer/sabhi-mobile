import * as React from 'react'
import { render } from 'react-native-testing-library'
import Loader from '../Loader'

describe('Component(snapshots): Loader', () => {
  it('should render with no props', () => {
    const tree = render(<Loader />)

    expect(tree).toMatchSnapshot()
  })

  it('should render with all props', () => {
    const tree = render(
      <Loader bottom={100} left={100} zIndex={100} text={'Loader test'} width={200} size={'large'} />,
    )

    expect(tree).toMatchSnapshot()
  })
})
