import { createContext, ReactNode, useContext, useState } from 'react'

import { debug } from './debug'
import { Block } from './types'

export type MapInformation = {
  blocks: Block[]
}

const emptyMap: MapInformation = {
  blocks: [],
}

export type MapContextInformation = {
  map: MapInformation
  placeBlock: (block: Block) => void
}

const MapContext = createContext<MapContextInformation | null>(null)

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<MapInformation>(emptyMap)

  const placeBlock = (newBlock: Block) => {
    setMap((prev) => {
      return {
        blocks: [...prev.blocks, newBlock],
      }
    })
  }

  debug(map.blocks)

  return (
    <MapContext.Provider value={{ map, placeBlock }}>
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
