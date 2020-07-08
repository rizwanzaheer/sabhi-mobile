/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import { Container, Text, Screen, Button, Constants, Device } from '@uiux'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Image, ActivityIndicator, ProgressBarAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as Progress from 'react-native-progress'

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield'

import { Colors, Metrics } from '../../theme'
import { AppContext } from '../../providers/AppContext'

const PersonalDetail: React.FC<NavigationStackScreenProps> & {
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

  // const fieldRef: any = React.createRef();

  // const onSubmit: any = () => {
  //   let { current: field } = fieldRef;

  //   console.log(field.value());
  // };

  // const formatText: any = (text: any) => {
  //   return text.replace(/[^+\d]/g, '');
  // };

  return (
    <LinearGradient
      colors={[Colors.SECONDARY_BRAND_GRADIENT, Colors.PRIMARY_BRAND_GRADIENT]}
      style={{ flex: 1 }}
    >
      <Screen
        safeAreaBottom={true}
        // safeAreaBottomBackground={Colors.WHITE}
        background={'primary'}
        // backgroundColor={'#35568D'}
      >
        {loading && (
          <Container flex={1} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator size={'large'} />
          </Container>
        )}
        <Container testID={'ONBOARDING_PERSONAL_DETAIL_TOP'}>
          <Container padding={Metrics.spacing.screen.default}>
            <Text
              textColor={Colors.BRAND}
              type={Constants.TextTypes.H1}
              textStyle={{ lineHeight: 36 }}
            >
              Personal
            </Text>
            <Text
              type={Constants.TextTypes.H1}
              bold
              textColor={Colors.BRAND}
              textStyle={{ lineHeight: 36 }}
            >
              Details
            </Text>
            <Container
              paddingTop={Metrics.spacing.vertical.medium}
              paddingBottom={Metrics.spacing.vertical.small}
            >
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.2}
                color={Colors.SECONDARY_BRAND_MAIN}
              />
            </Container>

            <Container marginTop={Metrics.spacing.vertical.small}>
              <Text type={Constants.TextTypes.Body}>
                To secure your account, we need to determine if it’s really you.
                You will be prompted to scan your ID.
              </Text>
            </Container>
            <Container w={200}>
              <FilledTextField
                label="Phone number"
                keyboardType="phone-pad"
                formatText={() => console.log('on format text')}
                onSubmitEditing={() => console.log('on submit editing')}
                // ref={fieldRef}
              />
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
              buttonText={'Confirm'}
              onPress={() => navigation.navigate('IntroStartScanning')}
            />
          </Container>
        </Container>
      </Screen>
    </LinearGradient>
  )
}

PersonalDetail.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false,
  }
}

export default PersonalDetail
