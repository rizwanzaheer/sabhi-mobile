import React, { useState } from 'react'
import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'
import { TextInput, TouchableOpacity } from 'react-native'
import { withTheme } from '../../theming'
import Icon from '../Icon/Icon'

interface InlineCredentialProps {
  onCreate: (value: string) => void
  inputRef?: any
  claimType: string
  theme: any
}

const InlineCredential: React.FC<InlineCredentialProps> = ({ claimType, theme, inputRef, onCreate }) => {
  const [value, setValue] = useState<string>()

  return (
    <Container paddingTop paddingBottom marginBottom>
      <Text type={TextTypes.SubTitle}>
        Self sign a <Text bold>{claimType}</Text> credential
      </Text>
      <Container
        padding
        marginBottom
        marginTop
        br={5}
        borderWidth={1}
        borderColor={theme.colors.primary.divider}
      >
        <Container>
          <Text type={TextTypes.SubTitle}>{claimType}</Text>
        </Container>
        <Container flexDirection={'row'} alignItems={'center'} justifyContent={'center'} marginTop={5}>
          <TextInput
            testID="inline_credential_input"
            onChangeText={(t: string) => setValue(t)}
            value={value}
            autoCapitalize={'sentences'}
            autoCorrect={false}
            style={{ fontSize: 19, padding: 0, flex: 1, color: '#000000' }}
            placeholder={'Enter ' + claimType}
            ref={inputRef}
          />
          <Container>
            <TouchableOpacity
              onPress={() => value && onCreate(value)}
              disabled={!value}
              testID={'inline_credential_submit'}
            >
              <Icon
                icon={{ name: 'ios-arrow-dropright', iconFamily: 'Ionicons' }}
                color={value ? theme.colors.primary.brand : theme.colors.primary.accessories}
                size={28}
              />
            </TouchableOpacity>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default withTheme(InlineCredential)
