/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import { Image, ActivityIndicator } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { RNCamera } from 'react-native-camera'

import { Container, Text, Screen, Button, Constants, Device } from '@uiux'
import { Colors, Metrics } from '../../theme'
import { AppContext } from '../../providers/AppContext'

const ScanBack: React.FC<NavigationStackScreenProps> & {
  navigationOptions: any
} = ({ navigation }) => {
  const [selectedIdentity] = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (selectedIdentity !== null) {
      navigation.navigate('App')
    }
    if (selectedIdentity === null) {
      setLoading(false)
    }
  }, [selectedIdentity])

  return (
    <Screen
      safeAreaBottom={true}
      // safeAreaBottomBackground={Colors.WHITE}
      background={'custom'}
      backgroundColor={Colors.PRIMARY_BRAND_MAIN}
    >
      <Container testID={'ONBOARDING_WELCOME_SCAN_FRONT_TOP'}>
        <Container
          marginTop={Metrics.spacing.vertical.default}
          // padding={Metrics.spacing.screen.default}
          // w={311}
          // h={437}
          // alignItemsß{'center'}
          // justifyContent={'center'}
          // marginLeft={Metrics.spacing.horizontal.large}
          // marginRight={Metrics.spacing.horizontal.large}
          // backgroundColor={Colors.PRIMARY_BRAND_LIGHT}
          // w={'100%'}
          // h={'70%'}
        >
          {/* <Text type={Constants.TextTypes.Body} >
              Please take a picture of the back side of your ID. Make sure it is clearly visible inside the marker.
            </Text> */}
          <Container
            w={Device.width - Metrics.spacing.horizontal.default * 2}
            h={100 * (Device.width / 110)}
            backgroundColor={Colors.PRIMARY_BRAND_LIGHT}
            viewStyle={{
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 16,
            }}
          >
            <RNCamera
              testID={'CAMERA'}
              captureAudio={false}
              style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                // alignSelf: 'center',

                height: '100%',
                width: '80%',
                // marginTop: Metrics.spacing.vertical.extraLarge * 1.5,
              }}
              onBarCodeRead={d => console.log('onBarCodeRead is: ', d)}
            />
          </Container>
        </Container>
        <Container padding={Metrics.spacing.screen.default}>
          <Container marginTop={Metrics.spacing.vertical.small}>
            <Text type={Constants.TextTypes.Body}>
              Please take a picture of the back side of your ID. Make sure it is
              clearly visible inside the marker.
            </Text>
          </Container>
        </Container>
      </Container>

      <Container
        alignItems={'center'}
        viewStyle={{
          position: 'absolute',
          alignContent: 'center',
          alignSelf: 'center',
          bottom: Metrics.spacing.vertical.large,
        }}
      >
        <Container w={300}>
          <Button
            fullWidth
            block={Constants.ButtonBlocks.Filled}
            type={Constants.BrandOptions.Secondary}
            buttonText={'Scan Back'}
            onPress={() => navigation.navigate('ConfirmScan')}
          />
        </Container>
      </Container>
    </Screen>
  )
}

ScanBack.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false,
  }
}

export default ScanBack
