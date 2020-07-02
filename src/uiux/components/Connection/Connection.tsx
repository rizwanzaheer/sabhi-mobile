import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import Container from '../Container/Container'
import Text from '../Text/Text'
import Avatar from '../Avatar/Avatar'
import { withTheme } from '../../theming'

interface ConnectionProps {
  onPress: () => void
  did: string
  isManaged: boolean
  shortId: string
  profileImage?: string
  theme: any
}

const Connection: React.FC<ConnectionProps> = ({ onPress, did, isManaged, shortId, profileImage, theme }) => {
  const displayDid = shortId.startsWith('did:ethr:') ? shortId.slice(9, -4) : shortId
  const source = profileImage ? { source: { uri: profileImage } } : {}
  const gravatar: any = shortId.startsWith('did:ethr:') ? { gravatarType: 'retro' } : {}

  return (
    <TouchableOpacity onPress={onPress}>
      <Container alignItems={'center'} justifyContent={'center'} padding={10}>
        <Container marginBottom={10}>
          {isManaged && (
            <Container
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColor={theme.colors.theme.CONFIRM}
              viewStyle={{
                borderWidth: 1,
                borderColor: '#ffffff',
                width: 14,
                height: 14,
                borderRadius: 10,
                position: 'absolute',
                zIndex: 100,
                bottom: 0,
                right: 3,
              }}
            ></Container>
          )}
          <Avatar size={60} address={did} title={shortId} {...source} {...gravatar} />
        </Container>
        <Text textStyle={{ fontSize: 14 }}>{displayDid}</Text>
      </Container>
    </TouchableOpacity>
  )
}

export default withTheme(Connection)
