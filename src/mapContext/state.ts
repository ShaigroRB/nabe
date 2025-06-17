import { emptyMap } from '../constants'
import { MapInformation, MapObjectProperties } from '../map'
import { DistributeOmit } from '../types'

export type MapState = {
  /** Id for the next object to be created */
  nextId: number
  /** Selected map object properties */
  selected: DistributeOmit<MapObjectProperties, 'id' | 'x' | 'y'>
  map: MapInformation
  /**
   * Record of current objects on the map by coordinates.
   * Can be used to quickly check for existence of an object at
   * given coordinates.
   *
   * Use `getMapObjectIdByCoords` to compute an id for a map object.
   *
   * Keys are composed as `objectName,x-y`.
   * @example 'block,128-56' -> Block present at x: 128, y: 56
   * @example 'ladder,0-0' -> Ladder present at x: 0, y: 0
   */
  mapObjsByCoords: Record<string, boolean>
}

export const defaultMapState: MapState = {
  nextId: 0,
  selected: {
    name: 'block',
  },
  map: emptyMap,
  mapObjsByCoords: {},
}
