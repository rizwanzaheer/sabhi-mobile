import * as React from 'react'
import { withTheme } from '../../theming'

import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'

interface SectionProps {
  /**
   * Section title
   */
  title?: string

  /**
   * Section title type. Use TextTypes constant
   */
  sectionTitleType?: string

  /**
   * Remove top margin
   */
  noTopMargin?: boolean

  /**
   * Remove top border
   */
  noTopBorder?: boolean

  /**
   * Theme passed in by HOC
   */
  theme: any
}

const Section: React.FunctionComponent<SectionProps> = props => {
  return (
    <Container marginTop={props.noTopMargin ? 0 : props.theme.spacing.section}>
      {props.title && (
        <Container paddingLeft={true}>
          <Text
            paddingBottom={true}
            bold={!!props.sectionTitleType}
            type={props.sectionTitleType ? props.sectionTitleType : TextTypes.SectionHeader}
          >
            {props.title}
          </Text>
        </Container>
      )}
      <Container dividerTop={!props.noTopBorder} dividerBottom={true} background={'primary'}>
        {props.children}
      </Container>
    </Container>
  )
}

export default withTheme(Section)
