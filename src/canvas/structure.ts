import * as PIXI from 'pixi.js'

import { generateGrid } from './grid'
import {
  ZINDEX_CONTAINER_DETECT_EVENTS,
  ZINDEX_DRAWING_CONTAINER,
  ZINDEX_PREVIEW_PLACED_OBJECT,
} from './zIndexes'

let structure = {
  rootContainer: new PIXI.Container(),
  gridLayer: new PIXI.Container(),
  userContainer: new PIXI.Container(),
  drawingContainer: new PIXI.Container(),
  previewLayer: new PIXI.Container(),
  eventsLayer: new PIXI.Graphics(),
}

/**
 * Except for the PIXI.Application, the rest of the structure can be created
 * as a synchronous operation.
 */

export const PADDING_CANVAS = 16
export const windowHeight = window.innerHeight
export const windowWidth = window.innerWidth
export const gridHeight = windowHeight - PADDING_CANVAS * 2
export const gridWidth = windowWidth - PADDING_CANVAS

/** The root container contains all the layers. */
const rootContainer = new PIXI.Container()
// automatically sort children by z-index
rootContainer.sortableChildren = true
rootContainer.renderable = true

/** The grid layer contains the grid. */
const gridLayer = generateGrid(gridWidth, gridHeight)
gridLayer.x = PADDING_CANVAS

// handle custom width & height later
export function createPixiAppStructure() {
  const { width, height } = { width: gridLayer.width, height: gridLayer.height }

  /** The user container contains all the layers that are directly related to user interaction:
   * - preview layer
   * - events layer
   * - container where objects are drawn
   * - ...?
   *
   * The grid layer is not in the user container.
   */
  const userContainer = new PIXI.Container({ width, height })
  userContainer.sortableChildren = true
  userContainer.x = PADDING_CANVAS

  /** The preview layer contains a preview of the current selected object. */
  const previewLayer = new PIXI.Container({
    width,
    height,
    zIndex: ZINDEX_PREVIEW_PLACED_OBJECT,
  })

  /** The drawing container contains all the different layers where the objects are drawn. */
  const drawingContainer = new PIXI.Container({
    width,
    height,
    zIndex: ZINDEX_DRAWING_CONTAINER,
  })

  /**
   * The events layer is a layer just above the grid layer and under all the other layers.
   * It exists to listen & handle all user interaction events.
   */
  const eventsLayer = new PIXI.Graphics({ width, height, alpha: 0 })
  eventsLayer.zIndex = ZINDEX_CONTAINER_DETECT_EVENTS
  eventsLayer.eventMode = 'static'
  // define a rectangle so something appears and can be clicked
  // even though it is transparent
  eventsLayer.rect(0, 0, width, height).fill(0xff00f0)

  structure = {
    rootContainer,
    gridLayer,
    userContainer,
    previewLayer,
    drawingContainer,
    eventsLayer,
  }

  rootContainer.addChild(gridLayer)
  rootContainer.addChild(userContainer)

  userContainer.addChild(previewLayer)
  userContainer.addChild(drawingContainer)
  userContainer.addChild(eventsLayer)

  return structure
}

export function clearDrawingContainer() {
  structure.drawingContainer.removeChildren()
}
