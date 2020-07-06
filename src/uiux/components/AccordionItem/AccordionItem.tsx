import * as React from 'react'
import { TouchableHighlight } from 'react-native'

import Container from '../Container/Container'
import Icon from '../Icon/Icon'
import Text, { TextTypes } from '../Text/Text'
import { withTheme } from '../../theming'

interface AccordionItemProps {
  /**
   * Remove bottom divider
   */
  last?: boolean

  /**
   * Remove bottom divider
   */
  dividerBottom?: boolean

  /**
   * Subtitle to show over main text
   */
  subTitle?: string

  /**
   *  Note to show on the right
   */
  itemNote?: string

  /**
   *  Note to show on the right
   */
  indicator?: 'down' | 'up' | null

  /**
   *  Note to show on the right
   */
  onPress?: () => void

  /**
   *  Theme
   */
  theme: any
}
/**
 * Expandable list items for credentials
 */
const AccordionItem: React.FC<AccordionItemProps> = props => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <Container
        background={'primary'}
        paddingLeft={24}
        paddingTop={16}
        paddingBottom={16}
        dividerBottom={!props.last || props.dividerBottom}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <Container flex={1}>
          {props.subTitle && <Text type={TextTypes.SubTitle}>{props.subTitle}</Text>}
          <Container paddingTop={2}>
            <Text type={TextTypes.Body}>{props.children}</Text>
          </Container>
        </Container>
        {props.itemNote && (
          <Container paddingRight={32}>
            <Text type={TextTypes.ListItemNote}>{props.itemNote}</Text>
          </Container>
        )}
        {props.indicator && (
          <Container paddingRight={true}>
            <Icon icon={props.theme.icons[props.indicator.toUpperCase()]} />
          </Container>
        )}
      </Container>
    </TouchableHighlight>
  )
}
export default withTheme(AccordionItem)
