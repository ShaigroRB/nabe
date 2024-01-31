import * as PIXI from 'pixi.js'

const CELL_SIZE = 40
const MAX_WIDTH = 2000
const MAX_HEIGHT = 2000

/**
 * Generate a grid.
 * @returns Container of the grid.
 */
export function generateGrid() {
  const gridContainer = new PIXI.Container()
  gridContainer.zIndex = -200
  const line = initializeLine({ x: 0, y: 0 })

  // draw horizontal lines from top to bottom
  // each line is spaced of CELL_SIZE pixels
  for (let y = 0; y < MAX_HEIGHT; y += CELL_SIZE) {
    line.moveTo(0, y).lineTo(MAX_WIDTH, y)
    gridContainer.addChild(line)
  }

  // draw vertical lines from left to right
  // each line is spaced of CELL_SIZE pixels
  for (let x = 0; x < MAX_WIDTH; x += CELL_SIZE) {
    line.moveTo(x, 0).lineTo(x, MAX_HEIGHT)
    gridContainer.addChild(line)
  }

  return gridContainer
}

function initializeLine({ x, y }: { x: number; y: number }) {
  const line = new PIXI.Graphics()
  line.moveTo(x, y).beginFill('black').lineStyle({ width: 1 })

  return line
}
