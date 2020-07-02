import * as React from 'react'
import { render } from 'react-native-testing-library'
import LogItem from '../LogItem'

describe('Component(snapshots): LogItem', () => {
  it('should render with required props', () => {
    const tree = render(<LogItem message={'Really bad error'} type={0} time={'TODAY'} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with all props', () => {
    const tree = render(
      <LogItem message={'Really bad error'} category={'The Moon'} type={0} time={'TODAY'} />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
