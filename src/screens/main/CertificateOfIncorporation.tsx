/**
 *
 */
import React, { useContext, useEffect, useState } from 'react'
import { Container, Text, Screen, Button, Constants, TextField } from '@uiux'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { ActivityIndicator, ProgressBarAndroid } from 'react-native'

import { Colors, Metrics } from '../../theme'
import { AppContext } from '../../providers/AppContext'

const CertificateOfIncorporation: React.FC<NavigationStackScreenProps> & {
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

  const fieldRef: any = React.createRef()

  const onSubmit: any = () => {
    let { current: field } = fieldRef

    console.log(field.value())
  }

  const formatText: any = (text: any) => {
    return text.replace(/[^+\d]/g, '')
  }

  const onChangeText = (e: any) => {
    console.log('onChangeText is: ', e)
  }

  return (
    <Screen
      safeAreaBottom={true}
      // safeAreaBottomBackground={Colors.WHITE}
      background={'primary'}
      scrollEnabled
      // backgroundColor={'#35568D'}
    >
      {loading && (
        <Container flex={1} alignItems={'center'} justifyContent={'center'}>
          <ActivityIndicator size={'large'} />
        </Container>
      )}
      <Container
        testID={'ONBOARDING_PERSONAL_DETAIL_TOP'}
        marginBottom={Metrics.spacing.screen.extraLarge * 2}
      >
        <Container padding={Metrics.spacing.screen.default}>
          <Text
            textColor={Colors.BRAND}
            type={Constants.TextTypes.H1}
            textStyle={{ lineHeight: 36 }}
          >
            Certificate Of
          </Text>
          <Text
            type={Constants.TextTypes.H1}
            bold
            textColor={Colors.BRAND}
            textStyle={{ lineHeight: 36 }}
          >
            Incorporation
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
              Here are the details we scanned from your ID document. Please
              review them carefully.
            </Text>
          </Container>
          <Container marginTop={Metrics.spacing.vertical.medium}>
            <TextField
              label="Corporate Identification Number"
              keyboardType="numeric"
              baseColor={Colors.PRIMARY_BRAND_MAIN}
              tintColor={Colors.SECONDARY_BRAND_MAIN}
              textColor={Colors.PRIMARY_BRAND_MAIN}
              lineWidth={2}
              activeLineWidth={4}
              // placeholder={'Please enter Corporate Identification Number'}
              fontSize={18}
              // formatText={this.formatText}
              // onSubmitEditing={this.onSubmit}
              // ref={this.fieldRef}
            />
            <TextField
              label="Company Name"
              keyboardType="numeric"
              baseColor={Colors.PRIMARY_BRAND_MAIN}
              tintColor={Colors.SECONDARY_BRAND_MAIN}
              textColor={Colors.PRIMARY_BRAND_MAIN}
              lineWidth={2}
              activeLineWidth={4}
              // placeholder={'Please enter Company Name'}
              fontSize={18}
              // formatText={this.formatText}
              // onSubmitEditing={this.onSubmit}
              // ref={this.fieldRef}
            />
            <TextField
              label="Type"
              keyboardType="numeric"
              baseColor={Colors.PRIMARY_BRAND_MAIN}
              tintColor={Colors.SECONDARY_BRAND_MAIN}
              textColor={Colors.PRIMARY_BRAND_MAIN}
              lineWidth={2}
              activeLineWidth={4}
              // placeholder={'Please enter street address'}
              fontSize={18}
              // formatText={this.formatText}
              // onSubmitEditing={this.onSubmit}
              // ref={this.fieldRef}
            />
            <Container flexDirection="row">
              <Container
                flex={1}
                marginRight={Metrics.spacing.horizontal.default}
              >
                <TextField
                  label="Date"
                  keyboardType="numeric"
                  baseColor={Colors.PRIMARY_BRAND_MAIN}
                  tintColor={Colors.SECONDARY_BRAND_MAIN}
                  textColor={Colors.PRIMARY_BRAND_MAIN}
                  lineWidth={2}
                  activeLineWidth={4}
                  // placeholder={'Please enter country of residence'}
                  fontSize={18}

                  // formatText={this.formatText}
                  // onSubmitEditing={this.onSubmit}
                  // ref={this.fieldRef}
                />
              </Container>
              <Container flex={1}>
                <TextField
                  label="No. ADI"
                  keyboardType="numeric"
                  baseColor={Colors.PRIMARY_BRAND_MAIN}
                  tintColor={Colors.SECONDARY_BRAND_MAIN}
                  textColor={Colors.PRIMARY_BRAND_MAIN}
                  lineWidth={2}
                  activeLineWidth={4}
                  // placeholder={'Please enter country of residence'}
                  fontSize={18}
                  // formatText={this.formatText}
                  // onSubmitEditing={this.onSubmit}
                  // ref={this.fieldRef}
                />
              </Container>
            </Container>
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
  )
}

CertificateOfIncorporation.navigationOptions = ({ navigation }: any) => {
  return {
    headerShown: false,
  }
}

export default CertificateOfIncorporation
