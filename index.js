import './shim'

// Temporary to stop crashes
import 'react-native-gesture-handler'

import { AppRegistry, Platform, YellowBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
// import Config from 'react-native-config'
// import * as Sentry from '@sentry/react-native'
// import analytics from '@segment/analytics-react-native'
import { enableScreens } from 'react-native-screens'
import { Device } from '@uiux'
import Debug from 'debug'
const debug = Debug('index')

YellowBox.ignoreWarnings([
  'componentWillUpdate',
  'componentWillReceiveProps',
  'RCTRootView cancelTouches',
])

if (Device.isIOS) {
  enableScreens()
}

// if (Config.SENTRY_DSN) {
//   Sentry.init({
//     dsn: Config.SENTRY_DSN,
//     environment: Config.SENTRY_ENVIRONMENT,
//     debug: true,
//   })
// }

// const defaultHandler =
//   ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler()

// if (defaultHandler) {
//   ErrorUtils.setGlobalHandler((error, isFatal) => {
//     debug(error.stack ? error.stack : error.message)
//     if (Config.SENTRY_DSN) {
//       Sentry.captureException(error)
//     }
//     defaultHandler && defaultHandler(error, isFatal)
//   })
// }

// if (Config.SEGMENT_IOS && Config.SEGMENT_ANDROID) {
//   analytics.setup(
//     Platform.OS === 'ios' ? Config.SEGMENT_IOS : Config.SEGMENT_ANDROID,
//     {
//       // Record screen views automatically!
//       recordScreenViews: true,
//       // Record certain application events automatically!
//       trackAppLifecycleEvents: true,
//     },
//   )
// }

AppRegistry.registerComponent(appName, () => App)
