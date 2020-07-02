import React, { useEffect, useState, createRef } from 'react'
import Container from '../Container/Container'
import { withTheme } from '../../theming'
import EventEmitter from 'events'
import Device from '../../services/device'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'

const SwitchEmitter = new EventEmitter()
const OPEN_BOTTOM_SHEET = 'OPEN_BOTTOM_SHEET'

interface CardProps {
  id: string
  children: (id: string) => React.ReactNode
  theme: any
  topRatio?: number // 2=half, 3=third, 4=quarter
  scrollEnabled?: boolean
}

export const BottomSnap = {
  open: (sheetId: string) => {
    SwitchEmitter.emit(OPEN_BOTTOM_SHEET, true, sheetId)
  },
  close: (sheetId: string) => {
    SwitchEmitter.emit(OPEN_BOTTOM_SHEET, false, sheetId)
  },
}

const BottomSheetWrapper: React.FC<CardProps> = ({ children, topRatio, scrollEnabled, theme }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [sheetId, setId] = useState('')
  const scrollViewRef = createRef<any>()
  const handleScrollTo = (p: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p)
    }
  }

  const open = (open: boolean, id?: string) => {
    setModalVisible(open)
    id && setId(id)
  }

  useEffect(() => {
    SwitchEmitter.addListener(OPEN_BOTTOM_SHEET, open)

    return () => {
      SwitchEmitter.removeListener(OPEN_BOTTOM_SHEET, open)
    }
  }, [])

  return (
    <Container>
      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down']}
        style={{ margin: 0, paddingTop: Device.height / (topRatio || 2) }}
        onSwipeComplete={() => open(false)}
        swipeThreshold={300}
        scrollOffset={100}
        scrollTo={handleScrollTo}
        propagateSwipe={true}
        onBackdropPress={() => open(false)}
      >
        <Container
          viewStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          background={'primary'}
          alignItems={'center'}
          justifyContent={'center'}
          padding
        >
          <Container br={5} backgroundColor={theme.colors.primary.accessories} w={50} h={5} />
        </Container>
        <Container flex={1} background={'primary'}>
          {scrollEnabled ? (
            <ScrollView style={{ flex: 1 }} ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 40 }}>
              {children(sheetId)}
            </ScrollView>
          ) : (
            children(sheetId)
          )}
        </Container>
      </Modal>
    </Container>
  )
}

export default withTheme(BottomSheetWrapper)
