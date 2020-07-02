import * as React from 'react'
import { Screen, Container, Button, Constants } from '@uiux'
// import * as Sentry from '@sentry/react-native'

export default () => {
  return (
    <Screen scrollEnabled>
      <Container padding>
        <Button
          fullWidth
          type={Constants.BrandOptions.Warning}
          block={Constants.ButtonBlocks.Outlined}
          buttonText={'JS Crash'}
          onPress={() => {
            throw new Error('Sample error from developer tools')
          }}
        />
      </Container>
      <Container padding>
        <Button
          fullWidth
          type={Constants.BrandOptions.Warning}
          block={Constants.ButtonBlocks.Outlined}
          buttonText={'Native Crash'}
          onPress={() => {
            console.log('onPress');
            // Sentry.nativeCrash()
          }}
        />
      </Container>
    </Screen>
  )
}
