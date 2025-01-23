import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { emptyMap } from '../constants'
import { debug } from '../debug'
import { Block, MapInformation } from '../map'

import { MapAction } from './actions'
import { reducer } from './reducer'
import { MapState } from './types'

export type MapContextInformation = {
  state: MapState
  dispatch: React.Dispatch<MapAction>
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
  const [state, dispatch] = useReducer(reducer, { map: emptyMap })

  const [newMap, setNewMap] = useState<MapInformation | null>(null)
  // initialize at true to draw the empty map first
  const [shouldRedraw, setShouldRedraw] = useState<boolean>(true)

  const redrawIsFinished = () => {
    setShouldRedraw(false)
  }

  const placeBlock = (newBlock: Block) => {
    dispatch({ type: 'place_block', payload: { ...newBlock } })
  }

  useEffect(() => {
    if (newMap !== null) {
      dispatch({ type: 'set_new_map', payload: { ...newMap } })
      setNewMap(null)
      setShouldRedraw(true)
    }
  }, [newMap])

  debug(state)

  return (
    <MapContext.Provider
      value={{
        state,
        dispatch,
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
