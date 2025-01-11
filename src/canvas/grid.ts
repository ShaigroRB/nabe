import * as PIXI from 'pixi.js'

import { roundToNearestMultiple } from '../utils/numbers'

const CELL_SIZE = 28

/**
 * Generate a grid.
 * @returns Container of the grid.
 */
export function generateGrid(maxWidth: number, maxHeight: number) {
  const gridContainer = new PIXI.Container()
  gridContainer.zIndex = -200
  const graphics = initializeGraphics({ x: 0, y: 0 })

  const roundedMaxWidth = roundToNearestMultiple(maxWidth, CELL_SIZE)
  const roundedMaxHeight = roundToNearestMultiple(maxHeight, CELL_SIZE)

  // draw horizontal lines from top to bottom
  // each line is spaced of CELL_SIZE pixels
  // +1 to draw the last line
  for (let y = 0; y < roundedMaxHeight + 1; y += CELL_SIZE) {
    graphics.moveTo(0, y).lineTo(roundedMaxWidth, y)
    gridContainer.addChild(graphics)
  }

  // draw vertical lines from left to right
  // each line is spaced of CELL_SIZE pixels
  // +1 to draw the last line
  for (let x = 0; x < roundedMaxWidth + 1; x += CELL_SIZE) {
    graphics.moveTo(x, 0).lineTo(x, roundedMaxHeight)
    gridContainer.addChild(graphics)
  }

  return gridContainer
}

function initializeGraphics({ x, y }: { x: number; y: number }) {
  const graphics = new PIXI.Graphics()
  graphics.moveTo(x, y).beginFill('black').lineStyle({ width: 1 })

  return graphics
}
