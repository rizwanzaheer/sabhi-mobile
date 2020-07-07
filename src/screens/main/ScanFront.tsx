/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import { Container, Text, Screen, Button, Constants, Device } from '@uiux'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import axios from 'axios'
import { Colors, Metrics } from '../../theme'
import { Image, ActivityIndicator } from 'react-native'
import { AppContext } from '../../providers/AppContext'
import LinearGradient from 'react-native-linear-gradient'

const ScanFront: React.FC<NavigationStackScreenProps> & {
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
    <LinearGradient
      colors={[Colors.SECONDARY_BRAND_GRADIENT, Colors.PRIMARY_BRAND_GRADIENT]}
      style={{ flex: 1 }}
    >
      <Screen
        safeAreaBottom={true}
        // safeAreaBottomBackground={Colors.WHITE}
        // background={'primary'}
        // backgroundColor={'#35568D'}
      >
        {loading && (
          <Container flex={1} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator size={'large'} />
          </Container>
        )}

        <Container testID={'ONBOARDING_WELCOME_NEXT_SCANNING_TOP'}>
          <Container marginTop={Metrics.spacing.vertical.small}>
            <Image
              source={require('../../assets/images/onboarding.png')}
              style={{
                alignContent: 'center',
                width: Device.width,
                height: 100 * (Device.width / 150),
              }}
              resizeMode={'contain'}
            ></Image>
          </Container>
          <Container padding={Metrics.spacing.screen.default}>
            <Text type={Constants.TextTypes.H1} textStyle={{ lineHeight: 36 }}>
              Keep your
            </Text>
            <Text
              type={Constants.TextTypes.H1}
              bold
              textColor={Colors.SECONDARY_BRAND_MAIN}
              textStyle={{ lineHeight: 36 }}
            >
              ID ready for scan.
            </Text>

            <Container marginTop={Metrics.spacing.vertical.small}>
              <Text type={Constants.TextTypes.Body}>
                Please take a picture of the front side of your ID. Make sure it
                is clearly visible inside the marker.
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
              buttonText={'Scan Front'}
              onPress={() => navigation.navigate('ScanBack')}
            />
          </Container>
        </Container>
      </Screen>
    </LinearGradient>
  )
}

ScanFront.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false,
  }
}

export default ScanFront
