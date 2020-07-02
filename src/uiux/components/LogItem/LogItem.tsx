import * as React from 'react'
import Container from '../Container/Container'
import Text, { TextTypes } from '../Text/Text'

import { withTheme } from '../../theming'

export enum LogMessageType {
  Info,
  Warning,
  Error,
}

interface LogItemProps {
  /**
   * 0 = info, 1 = Warning/Alert, 2 = Error
   */
  type: LogMessageType

  /**
   * A category for the lo item
   */
  category?: string

  /**
   * A time for the log item
   */
  time: string

  /**
   * Message to be shown
   */
  message: string

  /**
   * Theme passed down from HOC
   */
  theme: any
}

const LogItem: React.FC<LogItemProps> = props => {
  const { WARN, INFO, ERROR } = props.theme.colors.theme
  const logTypes = [WARN, INFO, ERROR]

  return (
    <Container flexDirection={'row'} marginBottom={1} backgroundColor={props.theme.colors.primary.background}>
      <Container w={2} backgroundColor={logTypes[props.type]} />
      <Container flex={1} padding={10}>
        <Container
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={5}
          paddingRight={true}
        >
          <Text type={TextTypes.SectionHeader}>{props.category}</Text>
          <Text type={TextTypes.SectionHeader}>{props.time}</Text>
        </Container>
        <Container>
          <Text>{props.message}</Text>
        </Container>
      </Container>
    </Container>
  )
}

export default withTheme(LogItem)
