/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import { Image, ActivityIndicator } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { RNCamera } from 'react-native-camera'
import LinearGradient from 'react-native-linear-gradient'
import { Container, Text, Screen, Button, Constants, Device } from '@uiux'

import { Colors, Metrics } from '../../theme'
import { AppContext } from '../../providers/AppContext'

const ConfirmScan: React.FC<NavigationStackScreenProps> & {
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
        flexDirection={'row'}
        w={Device.width}
        viewStyle={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: Metrics.spacing.vertical.large,
        }}
        paddingHorizontal={Metrics.spacing.horizontal.default}
      >
        {/* <Container
          //w={300}
          flexDirection={'row'}
          viewStyle={{
            // position: 'absolute',
            // alignContent: 'center',
            alignSelf: 'center',
            // bottom: Metrics.spacing.vertical.large,
            // padding: 0
          }}
        > */}
        <Container flex={1} padding={Metrics.spacing.horizontal.small}>
          <Button
            // fullWidth
            block={Constants.ButtonBlocks.Filled}
            type={Constants.BrandOptions.Custom}
            buttonText={'Retake'}
            onPress={() => navigation.navigate('ConfirmScan')}
          />
        </Container>
        <Container flex={2} padding={Metrics.spacing.horizontal.small}>
          <Button
            // fullWidth
            block={Constants.ButtonBlocks.Filled}
            type={Constants.BrandOptions.Secondary}
            buttonText={'Confirm'}
            onPress={() => navigation.navigate('ConfirmScan')}
          />
        </Container>

        {/* </Container> */}
      </Container>
    </Screen>
  )
}

ConfirmScan.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false,
  }
}

export default ConfirmScan
