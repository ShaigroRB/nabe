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

export type MapObjectPropertiesWithoutId = Omit<MapObjectProperties, 'id'>

export type MapObjectViaName<Name extends MapObjectProperties['name']> =
  Extract<MapObjectProperties, { name: Name }>

export type MapObjectName = MapObjectProperties['name']
export type PluralMabObjectName = `${MapObjectName}s`

// NEW_ASSET: add a new type here
export type Block = MapObjectViaName<'block'>
export type Spawn = MapObjectViaName<'spawn'>
export type Ladder = MapObjectViaName<'ladder'>
export type Terrain = MapObjectViaName<'terrain'>

// NEW_ASSET: add a new type if needed in MapInformation type
export type MapInformation = {
  blocks: Block[]
  spawns: Spawn[]
  ladders: Ladder[]
  terrains: Terrain[]
}

/** Retrieve a map object from its name */
export function inferMapObject<Name extends MapObjectProperties['name']>(
  obj: { name: Name } & Omit<MapObjectViaName<Name>, 'name'>,
): MapObjectViaName<Name> {
  return obj as MapObjectViaName<Name>
}
