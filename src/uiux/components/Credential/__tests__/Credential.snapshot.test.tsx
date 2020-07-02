import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import Credential from '../Credential'

const issuer = { did: '0xf1234', profileImage: 'http://', shortId: 'Issuer Name' }
const subject = { did: '0xf1234', profileImage: 'http://', shortId: 'Issuer Name' }
const fields = [
  {
    type: 'name',
    value: 'test value',
    isObj: false,
  },
]

describe('Component(snapshot): Credential', () => {
  it('should render with default props', () => {
    const tree = render(
      <Credential issuer={issuer} exp={1575299770} fields={fields} subject={subject} />,
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should fire on press event', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Credential
        marginBottom={10}
        issuer={issuer}
        exp={1575299770}
        fields={fields}
        subject={subject}
        onPress={onPress}
        testID={'CREDENTIAL_BTN'}
      />,
    )

    fireEvent.press(getByTestId('CREDENTIAL_BTN'))
    expect(onPress).toHaveBeenCalled()
  })
})
