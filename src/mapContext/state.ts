import { emptyMap } from '../constants'
import { MapInformation, MapObjectProperties } from '../map'

export type MapState = {
  /** Id for the next object to be created */
  nextId: number
  /** Selected map object properties */
  selected: Omit<MapObjectProperties, 'id' | 'x' | 'y'>
  map: MapInformation
}

export const defaultMapState: MapState = {
  nextId: 0,
  selected: {
    name: 'block',
  },
  map: emptyMap,
}
