import * as React from 'react'
import { ScrollView } from 'react-native'
import Container from '../Container/Container'
import Button, { ButtonBlocks } from '../Button/Button'
import Avatar from '../Avatar/Avatar'
import ActivityItemHeader from '../../components/ActivityItemHeader/ActivityItemHeader'
import * as UIUX from '../../types'
import { withTheme } from '../../theming'
import { BrandOptions } from '../../constants'

interface ActivityItemProps {
  /**
   * The unique id or message hash
   */
  id: string

  /**
   * The message type
   */
  type: 'w3c.vp' | 'w3c.vc' | 'sdr' | string

  /**
   * The timestamp for when this message was recieved or sent
   */
  date: number

  /**
   * The issuer of this message item
   */
  sender: UIUX.Identity

  /**
   * The activity that is takaing place
   */
  activity?: string

  /**
   * The subject
   */
  receiver: UIUX.Identity

  /**
   * The viewer
   */
  viewer: UIUX.Identity

  /**
   * The reason for the message
   */
  reason?: string

  /**
   * Message attachments
   */
  attachments?: any[]

  /**
   * Render attachment item
   */
  renderAttachment?: (attachmentItem: any, itemIndex: number) => React.ReactNode

  /**
   * Props to apply to attchment scrollview
   */
  attachmentScrollViewProps?: any

  /**
   * Message actions
   */
  actions?: string[]

  /*
   * The confirm action
   */
  confirm?: () => void

  /*
   * The reject action
   */
  reject?: () => void

  /**
   * Profile actions like being able to navigate to a profile
   */
  profileAction: (id: string) => void

  /**
   * Credential style
   */
  credentialStyle?: any
  /**
   * Theme prop
   */
  theme: any
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  activity,
  sender,
  receiver,
  viewer,
  reason,
  attachments,
  attachmentScrollViewProps,
  renderAttachment,
  actions,
  profileAction,
  date,
  confirm,
  reject,
  theme,
}) => {
  const issProfileSource = sender.profileImage ? { source: { uri: sender.profileImage } } : {}

  return (
    <Container background={'primary'} marginBottom={10}>
      <Container flex={1} flexDirection={'row'} padding>
        <Container alignItems={'center'}>
          <Container>
            <Avatar
              {...issProfileSource}
              type={'circle'}
              gravatarType={'retro'}
              address={sender.did}
              size={40}
            />
          </Container>
        </Container>
        <Container marginLeft paddingRight flex={1}>
          <ActivityItemHeader
            viewer={viewer}
            issuer={sender}
            subject={receiver}
            profileAction={profileAction}
            date={date}
            activity={activity || theme.activity.messages[type]}
            reason={reason}
          />
          {actions && type === 'sdr' && viewer.did !== sender.did && (
            <Container flex={1} marginTop flexDirection={'row'}>
              <Container flex={2} marginRight={5}>
                {confirm && actions[0] && (
                  <Button
                    small
                    buttonText={actions[0]}
                    type={BrandOptions.Primary}
                    block={ButtonBlocks.Filled}
                    onPress={confirm}
                  ></Button>
                )}
              </Container>
              <Container flex={2}>
                {reject && actions[1] && (
                  <Button
                    small
                    buttonText={actions[1]}
                    type={BrandOptions.Secondary}
                    block={ButtonBlocks.Filled}
                    onPress={reject}
                  ></Button>
                )}
              </Container>
            </Container>
          )}
        </Container>
      </Container>
      {attachments && attachments.length > 0 && renderAttachment && (
        <Container flex={1}>
          <ScrollView
            horizontal
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            {...attachmentScrollViewProps}
          >
            {attachments.map((item: any, itemIndex: number) => {
              return renderAttachment(item, itemIndex)
            })}
          </ScrollView>
        </Container>
      )}
    </Container>
  )
}

export default withTheme(ActivityItem)
