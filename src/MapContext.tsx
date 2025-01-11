import { createContext, ReactNode, useContext } from 'react'

import { Block } from './types'

  blocks: Block[]
}

const MapContext = createContext<Map | null>(null)

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MapContext.Provider value={{ blocks: [] }}>{children}</MapContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext)

  if (context === null) {
    throw new Error(
      'MapContext: Component is not a child of a MapContextProvider',
    )
  }

  return context
}
