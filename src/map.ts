import { DistributeOmit } from './types'

export type Coordinates = {
  x: number
  y: number
}

type BaseObjectProperties = { id: number } & Coordinates

// NEW_ASSET: add a new map object property with a new name
export type MapObjectProperties =
  | ({ name: 'block' } & BaseObjectProperties)
  | ({ name: 'spawn' } & BaseObjectProperties)
  | ({ name: 'ladder' } & BaseObjectProperties)
  | ({ name: 'terrain' } & BaseObjectProperties)
  | ({ name: 'ramp_bottom_left' } & BaseObjectProperties)
  | ({ name: 'ramp_bottom_right' } & BaseObjectProperties)
  | ({ name: 'ramp_top_left' } & BaseObjectProperties)
  | ({ name: 'ramp_top_right' } & BaseObjectProperties)

export type MapObjectPropertiesWithoutId = DistributeOmit<
  MapObjectProperties,
  'id'
>

export type MapObjectViaName<Name extends MapObjectProperties['name']> =
  Extract<MapObjectProperties, { name: Name }>

export type MapObjectName = MapObjectProperties['name']
export type PluralMapObjectName = `${MapObjectName}s`

// NEW_ASSET: add a new type here
export type Block = MapObjectViaName<'block'>
export type Spawn = MapObjectViaName<'spawn'>
export type Ladder = MapObjectViaName<'ladder'>
export type Terrain = MapObjectViaName<'terrain'>
export type SmallRamp = MapObjectViaName<
  'ramp_bottom_left' | 'ramp_bottom_right' | 'ramp_top_left' | 'ramp_top_right'
>

// NEW_ASSET: add a new type if needed in MapInformation type
export type MapInformation = {
  blocks: Block[]
  spawns: Spawn[]
  ladders: Ladder[]
  terrains: Terrain[]
  small_ramps: SmallRamp[]
}

/** Retrieve a map object from its name */
export function inferMapObject<Name extends MapObjectProperties['name']>(
  obj: { name: Name } & Omit<MapObjectViaName<Name>, 'name'>,
): MapObjectViaName<Name> {
  return obj as MapObjectViaName<Name>
}
