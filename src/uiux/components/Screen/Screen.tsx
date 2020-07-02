import * as React from 'react'
import { ImageSourcePropType, SafeAreaView, StatusBar, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Container from '../Container/Container'
import { withTheme } from '../../theming'
import * as UIUX from '../../types'

interface ScreenProps {
  /**
   * Safe area for entire View. This will over-ride other safearea options
   */
  safeArea?: boolean

  /**
   * Background type
   */
  background?: UIUX.BrandPropOptions

  /**
   * Safe background color. This will over-ride other safearea background color options
   */
  safeAreaBackground?: string

  /**
   * Safearea top
   */
  safeAreaTop?: boolean

  /**
   * Safearea top background color
   */
  safeAreaTopBackground?: string

  /**
   * Safearea bottom
   */
  safeAreaBottom?: boolean

  /**
   * Safearea bottom background color
   */
  safeAreaBottomBackground?: string

  /**
   * Enable scrolling view
   */
  scrollEnabled?: boolean

  /**
   * Provide a banner component for the view
   */
  bannerComponent?: React.ReactNode

  /**
   * Set a background image for the view
   */
  backgroundColor?: string

  /**
   * Set a background image for the view
   */
  backgroundImage?: ImageSourcePropType

  /**
   * Hide the status bar
   */
  statusBarHidden?: boolean

  /**
   * Set the statusbar style. Override the theme's default
   */
  statusBarStyle?: string

  /**
   * Provide a footer component
   */
  footerComponent?: React.ReactNode

  /**
   * Show a divider line between footer component and view
   */
  footerDivider?: boolean

  /**
   * Passed in by the HOC. Safe to ignore.
   */
  theme: any

  /**
   * An action button that floats over the content
   */
  fabButton?: React.ReactNode
}

/**
 * Screen component provides useful UI helpers that are needed on most screens.
 */
const Screen: React.FC<ScreenProps> = props => {
  const mainContent = (
    <React.Fragment>
      <StatusBar
        hidden={props.statusBarHidden}
        barStyle={props.statusBarStyle ? props.statusBarStyle : props.theme.statusBarStyle}
        animated={true}
        showHideTransition={'slide'}
      />
      <Container flex={1} background={props.background}>
        {props.children}
      </Container>
    </React.Fragment>
  )
  const scrollViewContent = (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: props.background
          ? props.theme.colors[props.background].background
          : props.backgroundColor
            ? props.backgroundColor
            : props.theme.colors.secondary.background,
      }}
      contentInsetAdjustmentBehavior={'never'}
    >
      {mainContent}
    </KeyboardAwareScrollView>
  )
  const scrollSafeViews = (
    <React.Fragment>
      {(props.safeArea || props.safeAreaTop) && (
        <SafeAreaView style={{ backgroundColor: props.safeAreaBackground || props.safeAreaTopBackground }} />
      )}
      {props.scrollEnabled ? scrollViewContent : mainContent}
      {props.footerComponent && (
        <Container
          paddingTop={true}
          dividerTop={props.footerDivider}
          backgroundColor={props.theme.colors.primary.background}
        >
          {props.footerComponent}
        </Container>
      )}
      {props.fabButton && (
        <Container viewStyle={{ position: 'absolute', width: '100%', bottom: 40, alignItems: 'center' }}>
          {props.fabButton}
        </Container>
      )}
      {(props.safeArea || props.safeAreaBottom) && (
        <SafeAreaView
          style={{
            backgroundColor:
              props.safeAreaBackground ||
              props.safeAreaBottomBackground ||
              props.theme.colors.primary.background,
          }}
        />
      )}
    </React.Fragment>
  )
  const backgroundImage = (
    <ImageBackground
      style={{ flex: 1 }}
      source={props.backgroundImage ? props.backgroundImage : {}}
      resizeMode={'cover'}
    >
      {scrollSafeViews}
    </ImageBackground>
  )

  return props.backgroundImage ? backgroundImage : scrollSafeViews
}

export default withTheme(Screen)
