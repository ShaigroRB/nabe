import * as PIXI from 'pixi.js'

import { roundDownToNearestPositiveMultiple } from '../utils/numbers'

export const CELL_SIZE = 28

/**
 * Generate a grid.
 * @returns Container of the grid.
 */
export function generateGrid(maxWidth: number, maxHeight: number) {
  const gridContainer = new PIXI.Container()
  gridContainer.zIndex = -200
  gridContainer.interactiveChildren = false
  const graphics = new PIXI.Graphics()

  const roundedMaxWidth = roundDownToNearestPositiveMultiple(
    maxWidth,
    CELL_SIZE,
  )
  const roundedMaxHeight = roundDownToNearestPositiveMultiple(
    maxHeight,
    CELL_SIZE,
  )

  // draw horizontal lines from top to bottom
  // each line is spaced of CELL_SIZE pixels
  // +1 to draw the last line
  for (let y = 0; y < roundedMaxHeight + 1; y += CELL_SIZE) {
    graphics.moveTo(0, y).lineTo(roundedMaxWidth, y)
  }

  // draw vertical lines from left to right
  // each line is spaced of CELL_SIZE pixels
  // +1 to draw the last line
  for (let x = 0; x < roundedMaxWidth + 1; x += CELL_SIZE) {
    graphics.moveTo(x, 0).lineTo(x, roundedMaxHeight)
  }

  graphics.stroke({ color: 0x000000, pixelLine: true })
  gridContainer.addChild(graphics)
  return gridContainer
}
