import { View, FlatList } from 'react-native'
import React from 'react'
import Credential from '../Credential'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import {
  render,
  fireEvent,
  waitForElement,
  shallow,
  act,
} from 'react-native-testing-library'

const sertoVerifiableCredential = {
  iss: 'Serto Identity Platform',
  sub: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
  iat: 1562769371,
  exp: 1579478400,
  hash: 'testHash',
  claim: {
    'Serto ID': {
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
    },
  },
  vc: [],
}

export const renderWithNavigation = (component: any, options: any) => {
  const Navigator = createAppContainer(
    createStackNavigator({
      CredentialDetail: createStackNavigator({
        Root: () => component,
      }),
    }),
  )
  return render(<Navigator />, options)
}

describe('Credential', () => {
  it('renders correctly with data', async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest
        .fn()
        .mockReturnValue({ ...sertoVerifiableCredential, type: 'Some VC' }),
      setParams: jest.fn(),
      state: {
        params: {
          sharingMode: false,
          toggleSharingMode: jest.fn(),
        },
      },
    }
    //@ts-ignore
    const tree = render(<Credential navigation={navigation} />)

    expect(navigation.getParam).toBeCalled()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly without data', () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest.fn().mockReturnValue(null),
      setParams: jest.fn(),
    }
    //@ts-ignore
    const tree = render(<Credential navigation={navigation} />).toJSON()

    expect(navigation.getParam).toBeCalled()
    expect(tree).toMatchSnapshot()
  })

  it('test sharing button', async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest
        .fn()
        .mockReturnValue({ ...sertoVerifiableCredential, type: 'Some VC' }),
      setParams: jest.fn(),
      state: {
        params: {
          sharingMode: false,
          toggleSharingMode: jest.fn(),
        },
      },
    }
    //@ts-ignore
    const tree = render(<Credential navigation={navigation} />)
    const Header = Credential.navigationOptions({ navigation: navigation })
    const headerTree = render(<Header.headerRight />)

    act(() => {
      fireEvent.press(headerTree.getByText('Share'))
    })

    expect(tree.toJSON()).toMatchSnapshot()
    expect(headerTree.toJSON()).toMatchSnapshot()
    expect(navigation.state.params.toggleSharingMode).toHaveBeenCalled()
  })

  it('test cancel sharing', async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest
        .fn()
        .mockReturnValue({ ...sertoVerifiableCredential, type: 'Some VC' }),
      setParams: jest.fn(),
      state: {
        params: {
          sharingMode: true,
          toggleSharingMode: jest.fn(),
          updateSelected: jest.fn(),
        },
      },
    }
    //@ts-ignore
    const tree = render(<Credential navigation={navigation} />)
    const Header = Credential.navigationOptions({ navigation: navigation })
    const headerTree = render(<Header.headerRight />)

    act(() => {
      fireEvent.press(headerTree.getByText('Cancel'))
    })

    expect(tree).toMatchSnapshot()
    expect(headerTree.toJSON()).toMatchSnapshot()
    expect(navigation.state.params.toggleSharingMode).toHaveBeenCalled()
  })

  it('test done button', async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest
        .fn()
        .mockReturnValue({ ...sertoVerifiableCredential, type: 'Some VC' }),
      setParams: jest.fn(),
      dismiss: jest.fn(),
      state: {
        params: {
          sharingMode: false,
          toggleSharingMode: jest.fn(),
        },
      },
    }
    //@ts-ignore
    const tree = render(<Credential navigation={navigation} />)
    const Header = Credential.navigationOptions({ navigation: navigation })
    const headerTree = render(<Header.headerLeft />)
    act(() => {
      fireEvent.press(headerTree.getByText('Done'))
    })

    expect(tree).toMatchSnapshot()
    expect(headerTree.toJSON()).toMatchSnapshot()
    expect(navigation.dismiss).toHaveBeenCalled()
  })
})
