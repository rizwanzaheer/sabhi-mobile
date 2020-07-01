import React, { useEffect, useContext } from 'react'
import {
  Container,
  Text,
  Screen,
  Avatar,
  Constants,
  Button,
  BottomSnap,
  Credential,
  Icon,
  Typings,
} from '@kancha/kancha-ui'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import TabAvatar from '../../navigators/components/TabAvatar'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery } from '@apollo/react-hooks'
import { GET_VIEWER_CREDENTIALS } from '../../lib/graphql/queries'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../../theme'
import hexToRgba from 'hex-to-rgba'
import { AppContext } from '../../providers/AppContext'

const SWITCH_IDENTITY = 'SWITCH_IDENTITY'

interface Props extends NavigationStackScreenProps {}

const ViewerProfile: React.FC<Props> & { navigationOptions: any } = ({
  navigation,
}) => {
  const [selectedIdentity] = useContext(AppContext)
  const { data, loading } = useQuery(GET_VIEWER_CREDENTIALS, {
    variables: {
      selectedIdentity,
    },
  })

  const viewer = data && data.viewer
  const credentials = data && data.credentials
  const source =
    viewer && data.viewer.profileImage
      ? { source: { uri: viewer.profileImage } }
      : {}

  useEffect(() => {
    if (viewer) {
      navigation.setParams({ viewer })
    }
  }, [data])

  return (
    <Screen scrollEnabled background={'primary'}>
      {loading && (
        <Container padding flex={1}>
          <Container
            w={100}
            h={100}
            br={5}
            background={'secondary'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <ActivityIndicator size={'large'} />
          </Container>
          <Container marginTop>
            <Container h={23} br={5} background={'secondary'}></Container>
            <Container marginTop>
              <Container
                h={60}
                backgroundColor={hexToRgba(Colors.CONFIRM, 0.3)}
                padding
                br={5}
              ></Container>
            </Container>
          </Container>
        </Container>
      )}

      {!loading && (
        <Container padding flex={1}>
          <Avatar
            {...source}
            type={'rounded'}
            size={100}
            address={viewer && viewer.did}
            gravatarType={'retro'}
            backgroundColor={'white'}
          />
          <Container marginTop>
            <Text type={Constants.TextTypes.H2} bold>
              {viewer && viewer.shortId}
            </Text>
            <Container marginTop>
              <Container
                backgroundColor={hexToRgba(Colors.CONFIRM, 0.3)}
                padding
                br={5}
              >
                <Text textStyle={{ fontFamily: 'menlo' }} selectable>
                  {viewer && viewer.did}
                </Text>
              </Container>
            </Container>
          </Container>
        </Container>
      )}
      <Container padding>
        {!loading && viewer && (
          <Container flexDirection={'row'}>
            <Text type={Constants.TextTypes.H3} bold>
              Credentials
            </Text>
          </Container>
        )}

        {!loading && credentials && credentials.length === 0 && (
          <Container marginTop>
            <Text type={Constants.TextTypes.Body}>
              Start issuing credentials to yourself and others. Try starting
              with a <Text bold>name</Text> credential to personalise this
              profile.
            </Text>
          </Container>
        )}
        {!loading && credentials && credentials.length > 0 && (
          <Container>
            <Container marginBottom>
              <Container marginTop>
                <Text type={Constants.TextTypes.Body}>
                  <Text bold>Received</Text> credentials are presented here as a
                  plain list for now. Some will be moved to the data explorer
                  tab where we can explore all of our data and connections.
                </Text>
              </Container>
            </Container>
            {credentials &&
              credentials.map((vc: any) => {
                return (
                  <Credential
                    key={vc.hash}
                    onPress={() =>
                      navigation.navigate('Credential', {
                        credentials: [vc],
                      })
                    }
                    background={'secondary'}
                    exp={vc.expirationDate}
                    issuer={vc.issuer}
                    subject={vc.subject}
                    fields={vc.claims}
                  />
                )
              })}
          </Container>
        )}
      </Container>
    </Screen>
  )
}

ViewerProfile.navigationOptions = ({ navigation }: any) => {
  const { viewer } = navigation.state.params || {}

  return {
    headerLeft: () => (
      <Container paddingLeft>
        <Button
          iconButton
          onPress={() =>
            viewer && navigation.navigate('IssueCredential', { viewer })
          }
          icon={
            <Icon
              color={Colors.CHARCOAL}
              icon={{ name: 'ios-create', iconFamily: 'Ionicons' }}
              size={30}
            />
          }
        />
      </Container>
    ),
    headerRight: () => (
      <Button
        onPress={() => BottomSnap.open(SWITCH_IDENTITY)}
        iconButton
        icon={<TabAvatar />}
      />
    ),
  }
}

export default ViewerProfile
