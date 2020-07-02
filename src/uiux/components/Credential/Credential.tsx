import * as React from 'react'
import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import Avatar from '../Avatar/Avatar'
import Card from '../Card/Card'
import Icon from '../Icon/Icon'
import * as Kancha from '../../types'
import { withTheme } from '../../theming'
import QRCode from 'react-native-qrcode-svg'

const S = require('sugar/string')

interface Field {
  type: string
  value: any
  isObj: boolean
}

export interface CredentialProps {
  onPress?: () => void
  issuer: Kancha.Identity
  subject: Kancha.Identity
  exp: number
  jwt?: string
  qrSize?: number
  fields: Field[]
  testID?: string
  shadow?: number
  background?: Kancha.BrandPropOptions
  detailMode?: boolean
  marginBottom?: number
  theme: any
}

const Credential: React.FC<CredentialProps> = ({
  shadow,
  onPress,
  issuer,
  background,
  fields,
  jwt,
  qrSize,
  subject,
  testID,
  detailMode,
  theme,
  marginBottom,
}) => {
  const subProfileSource = subject.profileImage ? { source: { uri: subject.profileImage } } : {}
  const issProfileSource = issuer.profileImage ? { source: { uri: issuer.profileImage } } : {}
  const credentialFields = fields.filter((field: any, i) => (detailMode ? field : i < 2))

  return (
    <Card
      onPress={onPress}
      testID={testID}
      shadow={shadow || 0}
      background={background}
      marginBottom={marginBottom}
    >
      <Container flexDirection={'row'} alignItems={'flex-start'}>
        <Container>
          <Avatar
            border
            {...subProfileSource}
            address={subject.did}
            type={'circle'}
            gravatarType={'retro'}
            size={40}
          />
          <Container viewStyle={{ position: 'absolute', top: 0, left: 15 }}>
            <Avatar
              border
              {...issProfileSource}
              address={issuer.did}
              type={'circle'}
              gravatarType={'retro'}
              size={40}
            />
          </Container>
        </Container>
        <Container marginLeft={28}>
          <Container>
            <Text bold type={TextTypes.ActivityTitle}>
              {issuer.shortId}
            </Text>
            <Container marginTop={3} flexDirection={'row'} alignItems={'flex-start'}>
              <Container marginRight={5}>
                <Icon
                  icon={{ name: 'ios-play', iconFamily: 'Ionicons' }}
                  size={15}
                  color={theme.colors.primary.text}
                />
              </Container>
              <Text type={TextTypes.ActivityTitle} textStyle={{ fontSize: 15 }}>
                {subject.shortId}
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container marginTop={detailMode ? 30 : 16}>
        {credentialFields.map((field: any, i: number) => {
          const fieldValueImage = !field.isObj
            ? field.value.endsWith('.jpg') || field.value.endsWith('.png')
            : false
          return (
            <Container marginBottom={5} key={i}>
              <Container>
                <Text textStyle={{ fontSize: 12, textTransform: 'uppercase' }} type={TextTypes.SubTitle}>
                  {S.String.titleize(field.type)}
                </Text>
              </Container>
              <Container justifyContent={'flex-start'}>
                {fieldValueImage ? (
                  <Container paddingTop={5}>
                    <Avatar
                      source={{ uri: field.value }}
                      address={issuer.did}
                      type={'rounded'}
                      gravatarType={'retro'}
                      size={25}
                    />
                  </Container>
                ) : (
                  <Text type={TextTypes.ActivityTitle}>
                    {field.isObj ? 'Type not supported yet' : field.value}
                  </Text>
                )}
              </Container>
            </Container>
          )
        })}
        {!detailMode && fields.length > 2 && (
          <Container>
            <Text type={TextTypes.SubTitle}>...</Text>
          </Container>
        )}
        {detailMode && jwt && (
          <Container marginTop={50} alignItems={'center'} justifyContent={'center'}>
            <QRCode size={qrSize ? qrSize : 200} value={jwt} />
          </Container>
        )}
      </Container>
    </Card>
  )
}

export default withTheme(Credential)
