import { DrawnObjProperties } from '../canvas/types'
import { MapInformation } from '../map'

import { MapState } from './state'

export function getMapObjectIdByCoords(obj: DrawnObjProperties) {
  return `${obj.name},${obj.x}-${obj.y}`
}

export function mapInformationToObjsByCoords(
  map: MapInformation,
): MapState['mapObjsByCoords'] {
  const objsByCoords: MapState['mapObjsByCoords'] = {}
  Object.values(map).forEach((arr) => {
    arr.forEach((mapObj) => {
      const id = getMapObjectIdByCoords(mapObj)
      objsByCoords[id] = true
    })
  })
  return objsByCoords
}
