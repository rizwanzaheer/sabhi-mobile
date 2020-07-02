import * as React from 'react'
import { render, act } from 'react-native-testing-library'
import Modal from '../Modal'
import Text from '../../Text/Text'

describe('Component(snapshots): Modal', () => {
  it('should render with no props', () => {
    const tree = render(<Modal />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props', () => {
    const dismiss = jest.fn()

    const tree = render(<Modal scrollEnabled={true} dismiss={dismiss} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with props and children', () => {
    const dismiss = jest.fn()

    const tree = render(
      <Modal scrollEnabled={true} dismiss={dismiss}>
        <Text>Test Modal</Text>
      </Modal>,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render layout ', () => {
    // mock nativeEvent with desired dimensions
    const mockNativeEvent = {
      nativeEvent: {
        layout: {
          width: 820,
        },
      },
    }
    const component = render(<Modal scrollEnabled={true} />)
    let tree = component.toJSON()

    act(() => {
      if (tree) {
        tree.props.onLayout(mockNativeEvent)
      }
    })
    tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
