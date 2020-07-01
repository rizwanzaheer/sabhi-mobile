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
} from '@kancha/kancha-ui'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import axios from 'axios';
import { Colors } from '../../theme'
import { Image, ActivityIndicator } from 'react-native'
import { AppContext } from '../../providers/AppContext'

const Intro: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
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
      background={'primary'}
      footerComponent={
        !selectedIdentity &&
        !loading && (
          <Container paddingHorizontal={true} paddingBottom={true}>
            <Container alignItems={'center'}>
              <Container w={300}>
                <Button
                  fullWidth
                  block={Constants.ButtonBlocks.Outlined}
                  type={Constants.BrandOptions.Primary}
                  buttonText={'Get Started'}
                  onPress={() => navigation.navigate('Onboarding')}
                />
              </Container>
            </Container>
          </Container>
        )
      }
    >
      {loading && (
        <Container flex={1} alignItems={'center'} justifyContent={'center'}>
          <ActivityIndicator size={'large'} />
        </Container>
      )}
      {!selectedIdentity && !loading && (
        <Container testID={'ONBOARDING_WELCOME_TOP'}>
          <Container padding alignItems={'center'} marginTop={50}>
            <Text type={Constants.TextTypes.H2} bold>
              Welcome to Daf
            </Text>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Click me!'}
              onPress={() => {
                console.log('Click me is calling!')

                axios({
                  method: 'post',
                  url: 'https://sabhi-web.herokuapp.com/user',
                  data: {
                    name: 'hamza'

                  }
                }).then(data => {
                  console.log('res data is: ', data);

                }).catch(e => {
                  console.log('e is: ', e);

                });
                // axios.get('https://my-json-server.typicode.com/typicode/demo/comments').then(data => {
                //   console.log('res data is: ', data);

                // }).catch(e => {
                //   console.log('e is: ', e);

                // });
              }}
            />
            <Container marginTop={4}>
              <Text type={Constants.TextTypes.Body}>
                Building trust so you can grow
              </Text>
            </Container>
          </Container>
          <Container marginTop={50}>
            <Image
              source={require('../../assets/images/onboarding_slide_1.png')}
              style={{
                alignContent: 'center',
                width: Device.width,
                height: 708 * (Device.width / 750),
              }}
              resizeMode={'contain'}
            ></Image>
          </Container>
        </Container>
      )}
    </Screen>
  )
}

export default Intro
