import 'react-native'
import React from 'react'
import Settings from '../../settings/Settings'
import { render, fireEvent, act } from 'react-native-testing-library'
import { useTranslation } from 'react-i18next' //'../../../__mocks__/react-i18next'
import { SwitchProvider } from '../../../theme/switcher'

const navigation = {
  navigate: jest.fn(),
}

it('renders correctly', () => {
  const tree = render(
    <SwitchProvider>
      {() => (
        // @ts-ignore
        <Settings navigation={navigation} />
      )}
    </SwitchProvider>,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test buttons', () => {
  const { t, i18n } = useTranslation()
  // @ts-ignore
  const tree = render(
    <SwitchProvider>
      {() => (
        // @ts-ignore
        <Settings navigation={navigation} />
      )}
    </SwitchProvider>,
  )

  act(() => {
    fireEvent.press(tree.getByTestId('MESSAGES_BTN'))
    fireEvent.press(tree.getByTestId('CREATE_CREDENTIAL_BTN'))
    fireEvent.press(tree.getByTestId('CREATE_REQUEST_BTN'))
    fireEvent.press(tree.getByTestId('CONNECTIONS_BTN'))
    fireEvent.press(tree.getByTestId('SIGNER_BTN'))
  })
  expect(navigation.navigate).toHaveBeenCalledTimes(5)
})
