/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import {
  Container,
  Text,
  Screen,
  Button,
  Constants,
  Device,
} from '@uiux'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import axios from 'axios';
import { Colors, Metrics } from '../../theme'
import { Image, ActivityIndicator } from 'react-native'
import { AppContext } from '../../providers/AppContext'
import LinearGradient from 'react-native-linear-gradient';

const Intro: React.FC<NavigationStackScreenProps> & {
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
        {!selectedIdentity && !loading && (
          <Container testID={'ONBOARDING_WELCOME_TOP'}>
            <Container
              marginTop={Metrics.spacing.vertical.small}
            >
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
            <Container padding={Metrics.spacing.screen.default}
            //marginTop={50}
            >
              <Text type={Constants.TextTypes.H1} textStyle={{ lineHeight: 36 }}>
                Secure
            </Text>
              <Text type={Constants.TextTypes.H1} bold textColor={Colors.SECONDARY_BRAND_MAIN} textStyle={{ lineHeight: 36, }}>
                Online Identity
            </Text>

              <Container marginTop={Metrics.spacing.vertical.small}>
                <Text type={Constants.TextTypes.Body}>
                  Your online business identity, secure at your fingertips. Send credentials to a Sabhi 3rd party service.
              </Text>
              </Container>
              <Text type={Constants.TextTypes.H5} textColor={Colors.SECONDARY_BRAND_MAIN}
                textStyle={{
                  marginTop: 24,
                }}>
                View privacy policy
            </Text>
            </Container>
            <Container
              paddingHorizontal={true} paddingBottom={true}
            >

            </Container >

          </Container>
        )}

        {
          !selectedIdentity &&
          !loading && (
            <Container alignItems={'center'} viewStyle={{
              position: "absolute", alignContent: 'center', alignSelf: 'center',
              bottom: Metrics.spacing.vertical.large
            }}>

              <Container w={300}>
                <Button
                  fullWidth
                  block={Constants.ButtonBlocks.Filled}
                  type={Constants.BrandOptions.Secondary}
                  buttonText={'Get Started'}
                  onPress={() => navigation.navigate('Onboarding')}
                />
              </Container>
            </Container>
          )
        }

      </Screen >
    </LinearGradient >
  )
}


Intro.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false
  }
}

export default Intro
