import { emptyMap } from '../constants'
import { MapInformation } from '../map'

export type MapState = {
  /** Id for the next object to be created */
  nextId: number
  map: MapInformation
}

export const defaultMapState: MapState = {
  nextId: 0,
  map: emptyMap,
}
