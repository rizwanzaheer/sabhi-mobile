import * as React from 'react'
import { TouchableHighlight, ViewStyle, Linking, TextInput } from 'react-native'
import { withTheme } from '../../theming'

import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import Icon from '../Icon/Icon'

interface ListItemProps {
  /**
   * Provides a custom icon component
   */
  iconLeft?: React.ReactNode

  /**
   * Provide the onPress function
   */
  onPress?: () => void

  /**
   * Provide an external link to navigate to
   */
  externalLink?: string

  /**
   * Prevent the default forward arrow from showing when onPress is defined
   */
  hideForwardArrow?: boolean

  /**
   * Text to be displayed on the right as a smaller accessory
   */
  accessoryRight?: string | number | undefined

  /**
   * Show the accessoryRight text in the theme warn color
   */
  warn?: boolean

  /**
   * This is the last item in a list
   */
  last?: boolean

  /**
   * Show the text input
   */
  editMode?: boolean

  /**
   * A subTitle for the list item
   */
  subTitle?: string

  /**
   *  Iten is selected flag
   */
  selected?: boolean

  /**
   * Function that gets called when text is changed
   */
  updateItem?: (item: string) => void

  /**
   * Disable tap events on list item
   */
  disabled?: boolean

  /**
   * Show bottom divider line
   */
  dividerBottom?: boolean

  /**
   * Provide a testID for e2e tests
   */
  testID?: string

  /**
   * Disbale accessbilityLabel on this item to allow sub items use to them
   */
  accessible?: boolean

  /**
   * Value passed in by theme HOC
   */
  theme: any
}

const ListItem: React.FunctionComponent<ListItemProps> = props => {
  const styles: ViewStyle = {
    backgroundColor: props.theme.colors.primary.background,
    flexDirection: 'row',
  }

  const onPressHandler = () => {
    const { onPress, externalLink } = props
    if (externalLink) {
      Linking.openURL(externalLink)
    } else if (onPress) {
      onPress()
    }
  }

  const actionIcon =
    props.onPress && !props.hideForwardArrow
      ? props.theme.icons.FORWARD
      : props.externalLink
      ? props.theme.icons.LINK
      : undefined

  return (
    <TouchableHighlight
      style={styles}
      onPress={onPressHandler}
      underlayColor={props.theme.colors.primary.underlay}
      disabled={props.disabled || (!props.onPress && !props.externalLink)}
      testID={props.testID}
      accessible={props.accessible}
      accessibilityLabel={props.testID}
    >
      <Container flex={1} flexDirection={'row'}>
        {props.iconLeft && (
          <Container
            alignItems={'center'}
            justifyContent={'center'}
            paddingLeft={true}
            paddingTop={8}
            paddingBottom={8}
          >
            {props.iconLeft}
          </Container>
        )}

        {props.editMode && (
          <Container
            alignItems={'center'}
            justifyContent={'center'}
            paddingLeft={true}
            paddingTop={8}
            paddingBottom={8}
          >
            <Icon icon={props.theme.icons.EDIT} size={18} />
          </Container>
        )}
        <Container
          flex={1}
          flexDirection={'row'}
          alignItems={'center'}
          dividerBottom={!props.last || props.dividerBottom}
          marginLeft={true}
          paddingTop={10}
          paddingBottom={10}
          paddingRight={true}
        >
          <Container flexDirection={'row'} flex={1} viewStyle={{ overflow: 'hidden' }}>
            <Container flex={1}>
              {props.subTitle && <Text type={TextTypes.SubTitle}>{props.subTitle}</Text>}
              {props.editMode ? (
                <Container>
                  <TextInput
                    style={{ fontSize: 18, padding: 0, flex: 1, color: '#000000' }}
                    defaultValue={(props.children && props.children.toString()) || ''}
                    onChangeText={props.updateItem}
                    placeholder={'Not provided'}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                  />
                </Container>
              ) : (
                <Container flexDirection={'row'} alignItems={'center'} paddingTop={3}>
                  <Text type={TextTypes.ListItem}>{props.children}</Text>
                </Container>
              )}
            </Container>
          </Container>
          <Container flexDirection={'row'} alignItems={'center'}>
            <Container marginRight={true} marginLeft={true} paddingTop={5} paddingBottom={5}>
              {props.accessoryRight && (
                <Text type={TextTypes.ListItemNote} warn={props.warn}>
                  {props.accessoryRight}
                </Text>
              )}
            </Container>
            {props.selected && (
              <Container paddingLeft={8}>
                <Icon icon={props.theme.icons.CHECKED} color={props.theme.colors.primary.brand} size={23} />
              </Container>
            )}
            {actionIcon && (
              <Icon icon={actionIcon} size={24} color={props.theme.colors.primary.accessories} />
            )}
          </Container>
        </Container>
      </Container>
    </TouchableHighlight>
  )
}

ListItem.defaultProps = {
  accessible: true,
}

export default withTheme(ListItem)
