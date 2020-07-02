import * as React from 'react'
import Text, { TextTypes } from '../Text/Text'
import Container from '../Container/Container'
import * as UIUX from '../../types'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItemHeaderProps {
  // Message hash
  id?: string
  // Timestanp in ms
  date: number
  // Reason text
  reason?: string
  // Activity text
  activity?: string
  // Issuer
  issuer: UIUX.Identity
  // Subject
  subject: UIUX.Identity
  // Profile Action
  viewer: UIUX.Identity
  profileAction: (id: string) => void
}

const ActivityItemHeader: React.FC<ActivityItemHeaderProps> = ({
  // id,
  reason,
  profileAction,
  activity,
  subject,
  issuer,
  viewer,
  date,
}) => {
  const viewerIsIssuer = viewer.did === issuer.did
  const viewerIsSubject = subject && subject.did === viewer.did

  return (
    <Container>
      <Container flex={1} marginBottom={4}>
        {reason ? (
          <Text>
            <Text type={TextTypes.ActivityTitle} bold onPress={() => profileAction(issuer.did)}>
              {viewerIsIssuer ? 'You' : issuer.shortId}
            </Text>
            <Text type={TextTypes.ActivityTitle}>&nbsp;{activity}</Text>
            <Text type={TextTypes.ActivityTitle}>&nbsp;so {viewerIsSubject ? 'you' : subject.shortId}</Text>
            <Text type={TextTypes.ActivityTitle} bold>
              &nbsp;{reason}
            </Text>
          </Text>
        ) : (
            <Text>
              <Text type={TextTypes.ActivityTitle} bold onPress={() => profileAction(issuer.did)}>
                {viewerIsIssuer ? 'You' : issuer.shortId}
              </Text>
              <Text type={TextTypes.ActivityTitle}>&nbsp;{activity}</Text>
              {subject ? (
                <Text type={TextTypes.ActivityTitle} bold onPress={() => profileAction(subject.did)}>
                  &nbsp;
                  {viewerIsSubject && viewerIsIssuer ? 'yourself' : viewerIsSubject ? 'you' : subject.shortId}
                </Text>
              ) : (
                  <Text type={TextTypes.ActivityTitle} bold onPress={() => profileAction(viewer.did)}>
                    &nbsp;you
                  </Text>
                )}
            </Text>
          )}
      </Container>
      <Text type={TextTypes.ActivitySubTitle}>{formatDistanceToNow(date)} ago</Text>
    </Container>
  )
}

export default ActivityItemHeader
