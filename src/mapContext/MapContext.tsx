import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { debug } from '../debug'
import { Coordinates, MapInformation } from '../map'

import { MapAction } from './actions'
import { reducer } from './reducer'
import { defaultMapState, MapState } from './state'

export type MapContextInformation = {
  state: MapState
  dispatch: React.Dispatch<MapAction>
  /** Function to place the selected map object */
  placeSelectedMapObject: (obj: Coordinates) => void
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
  const [state, dispatch] = useReducer(reducer, defaultMapState)

  const [newMap, setNewMap] = useState<MapInformation | null>(null)
  // initialize at true to draw the empty map first
  const [shouldRedraw, setShouldRedraw] = useState<boolean>(true)

  const redrawIsFinished = () => {
    setShouldRedraw(false)
  }

  const placeSelectedMapObject = ({ x, y }: Coordinates) => {
    dispatch({ type: 'place_any_object', payload: { x, y } })
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
        placeSelectedMapObject,
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
