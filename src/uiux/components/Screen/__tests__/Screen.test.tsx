import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import Screen from '../Screen'
import Container from '../../Container/Container'
import Text from '../../Text/Text'
import Button from '../../Button/Button'

describe('Component(assert): Screen', () => {
  it('should render its children', () => {
    const { getByText, getByTestId } = render(
      <Screen>
        <Container testID="ASSERT_TEST_ID">
          <Text>Testing rendered children</Text>
        </Container>
      </Screen>,
    )

    expect(getByText(/Testing rendered children/)).toBeDefined()
    expect(getByTestId('ASSERT_TEST_ID')).toBeDefined()
  })

  it('should render footer bar buttons that call functions', () => {
    const accept = jest.fn()
    const decline = jest.fn()
    const { getByText } = render(
      <Screen
        footerComponent={
          <Container>
            <Button onPress={accept} buttonText={'Accept'} />
            <Button onPress={decline} buttonText={'Decline'} />
          </Container>
        }
      />,
    )

    fireEvent.press(getByText('Accept'))
    expect(accept).toHaveBeenCalled()

    fireEvent.press(getByText('Decline'))
    expect(decline).toHaveBeenCalled()
  })

  it('should render a button(fab) and fire a function when tapped', () => {
    const onPressFab = jest.fn()
    const { getByTestId } = render(
      <Screen fabButton={<Button testID={'fab_button_test'} onPress={onPressFab} />} />,
    )

    fireEvent.press(getByTestId('fab_button_test'))
    expect(onPressFab).toHaveBeenCalled()
    expect(onPressFab).toHaveBeenCalledTimes(1)
  })
})
