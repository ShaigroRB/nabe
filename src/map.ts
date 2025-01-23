export type Coordinates = {
  x: number
  y: number
}

type BaseObjectProperties = { id: number } & Coordinates

export type MapObjectProperties =
  | ({ name: 'block' } & BaseObjectProperties)
  | ({ name: 'spawn' } & BaseObjectProperties)

export type MapObjectPropertiesWithoutId = Omit<MapObjectProperties, 'id'>

export type MapObjectViaName<Name extends MapObjectProperties['name']> =
  Extract<MapObjectProperties, { name: Name }>

export type MapObjectName = MapObjectProperties['name']

export type Block = MapObjectViaName<'block'>

export type MapInformation = {
  blocks: Block[]
}

/** Retrieve a map object from its name */
export function inferMapObject<Name extends MapObjectProperties['name']>(
  obj: { name: Name } & Omit<MapObjectViaName<Name>, 'name'>,
): MapObjectViaName<Name> {
  return obj as MapObjectViaName<Name>
}
