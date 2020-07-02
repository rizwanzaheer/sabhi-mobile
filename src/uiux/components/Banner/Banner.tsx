import * as React from 'react'
import { ImageBackground, ViewStyle } from 'react-native'
import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import Avatar from '../Avatar/Avatar'
import * as Kancha from '../../types'
import { withTheme } from '../../theming'

interface BannerProps {
  /**
   * Background image for banner
   */
  backgroundImage?: any

  /**
   * Banner size
   */
  size?: 'small' | 'medium'

  /**
   * Background color
   */
  backgroundColor?: string

  /**
   * Issuer
   */
  issuer: Kancha.Identity

  /**
   * Title of banner
   */
  title: string

  /**
   * Subtitle to show under title
   */
  subTitle?: string

  /**
   * Theme
   */
  theme: any
}

const bannerSize: { [index: string]: number } = {
  small: 180,
  medium: 250,
}

const Banner: React.FC<BannerProps> = props => {
  const BannerStyle: ViewStyle = {
    backgroundColor: '#333333',
    flex: 1,
    height: props.size ? bannerSize[props.size] : bannerSize.medium,
  }
  const source = props.issuer.profileImage ? { source: { uri: props.issuer.profileImage } } : {}
  return (
    <ImageBackground source={props.backgroundImage} style={BannerStyle}>
      <Container
        backgroundColor={props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,0.8)'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        paddingTop={true}
      >
        <Avatar {...source} size={56} type={'rounded'} gravatarType={'retro'} address={props.issuer.did} />
        <Container paddingTop={true} alignItems={'center'}>
          <Text type={TextTypes.H2} bold={true} textColor={'#FFFFFF'}>
            {props.title}
          </Text>
          <Container paddingTop={5} alignItems={'center'}>
            <Text type={TextTypes.SubTitle} textColor={'#FFFFFF'}>
              {props.subTitle && props.subTitle}
            </Text>
          </Container>
        </Container>
      </Container>
    </ImageBackground>
  )
}

export default withTheme(Banner)
