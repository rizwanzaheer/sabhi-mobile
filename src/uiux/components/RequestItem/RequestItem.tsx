import React, { useState, useEffect } from 'react'
import Container from '../Container/Container'
import Icon from '../Icon/Icon'
import Text, { TextTypes } from '../Text/Text'
import Radio from '../RadioBtn/RadioBtn'
import InlineCredentialInput from '../InlineCredential/InlineCredential'
import Credential from '../Credential/Credential'
import { TouchableHighlight } from 'react-native'
import { withTheme } from '../../theming'
import { RequestItemSelectable } from '../../types'
import * as Kancha from '../../types'

const S = require('sugar/string')

interface Issuers {
  did: {
    did: string
    url?: string
  }
}

interface CredentialField {
  type: string
  value: string
}

interface RequestCredential extends Kancha.VerifiableCredential {
  fields: CredentialField[]
}

interface RequestItem {
  /**
   *  Pass a test ID to button
   */
  testID?: string
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
  claimType: string

  /**
   *  Note to show on the right
   */
  itemNote?: string

  /**
   *  Credential property options
   */
  credentials: RequestCredential[]

  /**
   *  Issuers
   */
  issuers?: Issuers[]

  /**
   *  Reason
   */
  reason?: string

  /**
   *  The item being request is required
   */
  required?: boolean

  /**
   *  Return the selected item
   */
  onSelectItem: (id: string | null, jwt: string | null, claimType: string) => void

  /**
   *  When a VC is pressed
   */
  onPressVC?: (vc: Kancha.VerifiableCredential) => void
  /**
   *  Close after select item
   */
  closeAfterSelect?: boolean

  /**
   *  Function to self sign a credential
   */
  selfSign?: (claimType: string, value: string) => void

  /**
   *  The reference for the credential input
   */
  inputRef?: any

  /**
   *  Theme
   */
  theme: any
}
/**
 * Request list item for request flows
 */
const RequestItem: React.FC<RequestItem> = ({
  testID,
  required,
  credentials,
  claimType,
  onSelectItem,
  closeAfterSelect,
  onPressVC,
  last,
  dividerBottom,
  itemNote,
  reason,
  theme,
  issuers,
  inputRef,
  selfSign,
}) => {
  const [options, updateSelected] = useState<RequestItemSelectable[]>([])
  const [optionsExpanded, toggleOptions] = useState(false)
  const [shared, toggleShared] = useState(required)
  const selected = options.find((i: RequestItemSelectable) => i.selected)

  const makeSelection = (id: string | null, jwt: string | null, decline: boolean) => {
    const updatedOptions = options.map((item: any) => {
      return !decline && item.id === id ? { ...item, selected: true } : { ...item, selected: false }
    })
    updateSelected(updatedOptions)
    toggleShared(!decline)
    if (closeAfterSelect !== false) {
      toggleOptions(false)
    }
    onSelectItem(id, jwt, claimType)
  }

  useEffect(() => {
    let defaultOptions = credentials.map(
      (vc: any, index: number): RequestItemSelectable => {
        const field = vc.fields.find((field: CredentialField) => {
          return field.type === claimType
        })
        const otherFields = vc.fields
          .map((f: CredentialField) => f.type !== claimType && f.type)
          .filter((f: string | null) => f)
          .map((f: string) => S.String.titleize(f))

        return {
          id: vc.hash + '-' + index,
          jwt: vc.jwt,
          iss: vc.iss,
          ...field,
          otherFields,
          otherfieldCount: otherFields.length,
          selected: required && index === 0,
          vc,
        }
      },
    )

    updateSelected(defaultOptions)
  }, [credentials])

  return (
    <Container>
      <Container background={'primary'} dividerBottom={!last || dividerBottom}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => toggleOptions(!optionsExpanded)}
          testID={testID}
        >
          <Container
            paddingLeft={24}
            paddingBottom
            paddingTop={16}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Container flex={1}>
              {claimType && (
                <Text type={TextTypes.SubTitle}>
                  {S.String.titleize(claimType)}
                  {required ? '*' : ''}
                </Text>
              )}
              <Container paddingTop={2}>
                <Text warn={required && !selected} type={TextTypes.Body}>
                  {selected ? selected.value : 'Not Shared'}
                </Text>
              </Container>
            </Container>
            {itemNote && (
              <Container paddingRight={32}>
                <Text type={TextTypes.ListItemNote}>{itemNote}</Text>
              </Container>
            )}
            {
              <Container paddingRight={32}>
                <Icon icon={optionsExpanded ? theme.icons.UP : theme.icons.DOWN} />
              </Container>
            }
          </Container>
        </TouchableHighlight>
        {optionsExpanded && (
          <Container marginLeft={8} paddingLeft={true} paddingBottom={true} paddingRight={true}>
            <Container paddingBottom>
              <Text type={TextTypes.SubTitle}>{reason}</Text>
            </Container>
            {required && !selected && issuers && (
              <Container padding backgroundColor={'#FAD2D8'} br={5}>
                <Text type={TextTypes.Body}>
                  A {claimType} credential issued by <Text bold>{issuers[0].did.did}</Text> is required
                </Text>
              </Container>
            )}

            {!required && (
              <Container flexDirection={'row'} paddingBottom={10}>
                <Container flex={1}>
                  <Radio
                    disabled={required}
                    selected={!shared}
                    onPress={() => makeSelection(null, null, true)}
                  >
                    Do not share
                  </Radio>
                </Container>
              </Container>
            )}
            {options.map((item: RequestItemSelectable, index: number) => {
              return (
                <Container key={item.id + index}>
                  <Container
                    flexDirection={'row'}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    paddingBottom={10}
                  >
                    <Container flex={1}>
                      <Radio selected={item.selected} onPress={() => makeSelection(item.id, item.jwt, false)}>
                        {item.value}
                      </Radio>
                    </Container>
                  </Container>
                  <Credential
                    onPress={() => onPressVC && onPressVC(item.vc)}
                    issuer={item.vc.iss}
                    subject={item.vc.sub}
                    exp={item.vc.exp}
                    fields={item.vc.fields}
                    background={item.selected ? 'primary' : 'secondary'}
                    shadow={item.selected ? 2 : 0}
                  />
                </Container>
              )
            })}
            {!issuers && selfSign && (
              <InlineCredentialInput
                inputRef={inputRef}
                claimType={claimType}
                onCreate={(value: string) => selfSign(claimType, value)}
              />
            )}
          </Container>
        )}
      </Container>
    </Container>
  )
}
export default withTheme(RequestItem)
