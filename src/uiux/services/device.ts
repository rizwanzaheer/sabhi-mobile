import { Platform, Dimensions } from 'react-native'

interface DeviceProps {
  width: number
  height: number
  isIOS: boolean
  isAndroid: boolean
}

const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'
const { width, height } = Dimensions.get('window')

const Device: DeviceProps = {
  width,
  height,
  isIOS,
  isAndroid,
}

export default Device
