import { createContext, ReactNode, useContext, useState } from 'react'

import { debug } from './debug'
import { Block } from './types'

export type MapInformation = {
  blocks: Block[]
  placeBlock: (block: Block) => void
}

const MapContext = createContext<MapInformation | null>(null)

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[]>([])

  const placeBlock = (newBlock: Block) => {
    setBlocks((prev) => [...prev, newBlock])
  }

  debug(blocks)

  return (
    <MapContext.Provider value={{ blocks, placeBlock }}>
      {children}
    </MapContext.Provider>
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
