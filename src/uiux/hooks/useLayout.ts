import { useState } from 'react'

const useLayout = () => {
  const [layout, updateLayout] = useState<any>()

  return [layout, updateLayout]
}

export default useLayout
