import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { emptyMap } from './constants'
import { debug } from './debug'
import { Block, MapInformation } from './types'

export type MapContextInformation = {
  map: MapInformation
  placeBlock: (block: Block) => void
  /**
   * Contains information when map should be redrawn.
   * Map is redrawn after imports.
   */
  newMap: MapInformation | null
  setNewMap: (map: MapInformation) => void
  shouldRedraw: boolean
  redrawIsFinished: () => void
}

const MapContext = createContext<MapContextInformation | null>(null)

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<MapInformation>(emptyMap)
  const [newMap, setNewMap] = useState<MapInformation | null>(null)
  // initialize at true to draw the empty map first
  const [shouldRedraw, setShouldRedraw] = useState<boolean>(true)

  const redrawIsFinished = () => {
    setShouldRedraw(false)
  }

  const placeBlock = (newBlock: Block) => {
    setMap((prev) => {
      return {
        blocks: [...prev.blocks, newBlock],
      }
    })
  }

  useEffect(() => {
    if (newMap !== null) {
      setMap({ ...newMap })
      setNewMap(null)
      setShouldRedraw(true)
    }
  }, [newMap])

  debug(map)

  return (
    <MapContext.Provider
      value={{
        map,
        placeBlock,
        newMap,
        setNewMap,
        shouldRedraw,
        redrawIsFinished,
      }}
    >
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
