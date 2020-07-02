import * as React from 'react'
import { Image, ImageSourcePropType, PixelRatio } from 'react-native'

import Text from '../Text/Text'
import Container from '../Container/Container'
import { withTheme } from '../../theming'
import { GRAVATAR_URI } from '../../constants'
import md5 from 'md5'

interface AvatarProps {
  /**
   * Title for avatar. Gets shortened to first 2 letters. eg.'Sa' Useful for usernames.
   */
  title?: string

  /**
   * A blockchain address to create an identicon
   */
  address?: string

  /**
   * Avatar size. default 32
   */
  size?: number

  /**
   * Rounded or squared.
   */
  type?: 'circle' | 'square' | 'rounded'

  /**
   * Standard image source type prop
   */
  source?: ImageSourcePropType

  /**
   * Provide custom background color. Only visible in text avatars
   */
  backgroundColor?: string

  /**
   * Show a border around the avatar
   */
  border?: boolean

  /**
   * Specify the type of gravatar to be displayed
   */
  gravatarType?: 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank'

  /**
   * Theme properties passed in by HOC. Can ignore.
   */
  theme: any
}

const Avatar: React.FC<AvatarProps> = props => {
  const generateTitle = (str: string) => {
    return str.charAt(0).toUpperCase() + str.charAt(1).toLowerCase()
  }

  const size = props.size ? props.size : 32
  const type = props.type ? props.type : 'circle'
  const title = props.title ? generateTitle(props.title) : '?'
  const gravatarType = props.gravatarType ? props.gravatarType : 'identicon'
  const uri =
    props.address &&
    GRAVATAR_URI +
      md5(props.address) +
      '?s=' +
      PixelRatio.getPixelSizeForLayoutSize(size) +
      '&d=' +
      gravatarType
  const avatarTypeStyle = {
    height: size,
    width: size,
    backgroundColor: props.backgroundColor ? props.backgroundColor : props.theme.colors.primary.brand,
    ...(type === 'square' ? { borderRadius: 0 } : {}),
    ...(type === 'rounded' ? { borderRadius: 5 } : {}),
    ...(type === 'circle' ? { borderRadius: size / 2 } : {}),
    ...(props.border ? { borderWidth: 2, borderColor: props.theme.colors.primary.background } : {}),
  }

  const identicon = <Image source={{ uri }} style={[avatarTypeStyle, { backgroundColor: 'transparent' }]} />
  const imageAvatar = props.source ? (
    <Image source={props.source} style={[avatarTypeStyle, { backgroundColor: 'transparent' }]} />
  ) : null
  const textAvatar = props.title ? (
    <Container viewStyle={avatarTypeStyle} alignItems={'center'} justifyContent={'center'}>
      <Text bold={true} textColor={'#ffffff'} textStyle={{ fontSize: size * 0.5 }}>
        {title}
      </Text>
    </Container>
  ) : null

  return props.source ? imageAvatar : props.title ? textAvatar : identicon
}

export default withTheme(Avatar)
