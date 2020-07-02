import * as React from 'react'
import { withTheme } from '../../theming/index'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const IconsFontFamilies: { [index: string]: any } = {
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome5Pro,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
}

export interface IconConfig {
  name: string

  /**
   *  'Feather' | 'FontAwesome' | 'FontAwesome5' | 'AntDesign' | 'Entypo' | 'EvilIcons' | 'FontAwesome5Pro' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons'| 'MaterialIcons'
   */
  iconFamily: string
}

interface IconProps {
  /**
   * An icon object that contains the key name and font family. This would usually be part of a global icons objects
   */
  icon: IconConfig

  /**
   * The size of the icon. Default to 26
   */
  size?: number

  /**
   * The color of the icon. Defaults to primary theme accessory
   */
  color?: string

  /**
   * Used by the theme provider
   */
  theme: any
}

const Icon: React.FC<IconProps> = props => {
  const IconFont = IconsFontFamilies[props.icon.iconFamily]

  return (
    <IconFont
      name={props.icon.name}
      size={props.size ? props.size : 26}
      color={props.color ? props.color : props.theme.colors.primary.accessories}
    />
  )
}

export default withTheme(Icon)
