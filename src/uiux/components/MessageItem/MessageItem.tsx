import * as React from 'react'
import { TouchableHighlight } from 'react-native'
// import { withTheme } from '../../theming'

import Container from '../Container/Container'
import * as UIUX from '../../types'
import Text, { TextTypes } from '../Text/Text'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import { withTheme } from '../../theming'
import { formatDistanceToNow } from 'date-fns'

/**
 * Types will be moved and consolidated with existing types in ./types
 */

interface VCFields {
  type: string
  value: string | object
  isObj: boolean
}

interface VC {
  hash: string
  iss: UIUX.Identity
  sub: UIUX.Identity
  nbf?: number
  iat?: number
  exp?: number
  fields: VCFields[]
}

export interface DAFMessage {
  type: string
  tag?: string
  rowId: string
  hash: string
  iat?: number
  nbf?: number
  jwt: string
  vis: string
  iss: UIUX.Identity
  sub: UIUX.Identity
  aud?: UIUX.Identity
  vc?: VC[]
}

interface MessageItemProps {
  message: DAFMessage
  theme: any
  viewMessage: (message: DAFMessage) => void
  viewProfile: (did: string) => void
}

const MessageItem: React.FC<MessageItemProps> = ({ message, viewMessage, viewProfile, theme }) => {
  const subject = message.sub || message.aud
  const issuer = message.iss
  const subProfileSource = subject && subject.profileImage ? { source: { uri: subject.profileImage } } : {}
  const issProfileSource = issuer.profileImage ? { source: { uri: issuer.profileImage } } : {}

  return (
    <TouchableHighlight
      style={{ marginBottom: 5, backgroundColor: theme.colors.primary.background }}
      onPress={() => viewMessage(message)}
      underlayColor={'#FAFAFA'}
    >
      <Container flexDirection={'row'}>
        <Container padding>
          <Container>
            <Avatar
              {...issProfileSource}
              type={'circle'}
              gravatarType={'retro'}
              address={message.iss.did}
              size={38}
            />
            {subject && (
              <Container viewStyle={{ position: 'absolute', left: 20, top: 0 }}>
                <Avatar
                  {...subProfileSource}
                  border
                  type={'circle'}
                  gravatarType={'retro'}
                  address={subject.did}
                  size={40}
                />
              </Container>
            )}
          </Container>
        </Container>
        <Container paddingTop marginLeft={20} flex={1} paddingRight>
          <Text type={TextTypes.ActivityTitle}>
            <Text onPress={() => viewProfile(message.iss.did)} bold>
              {message.iss.shortId}&nbsp;
            </Text>
            sent a message to
            {subject ? (
              <Text onPress={() => viewProfile(subject.did)} bold>
                &nbsp;{subject.shortId}
              </Text>
            ) : (
                <Text bold>&nbsp;you</Text>
              )}
          </Text>
          <Container marginTop={5}>
            <Text type={TextTypes.ActivitySubTitle}>
              {message.tag && message.tag + ' • '}
              {message.type + ' • '}
              {(message.nbf && formatDistanceToNow(message.nbf * 1000)) + ' ago' || 'Some time ago'}
            </Text>
          </Container>
          <Container paddingTop paddingBottom flexDirection={'row'} alignItems={'center'}>
            <Icon icon={{ name: 'ios-attach', iconFamily: 'Ionicons' }} size={18} />
            <Container paddingLeft={5}>
              <Text>This raw message has {message.vc && message.vc.length} attachment(s)</Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </TouchableHighlight>
  )
}

export default withTheme(MessageItem)
