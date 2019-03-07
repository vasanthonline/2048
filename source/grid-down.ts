import * as config from 'config'
import Tile from './tile'
import GridRight from './grid-right'
import { Directions, Dimensions } from './interface'

export default class GridDown extends GridRight {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config.get('GRID_SIZE')) {
    super(grid, gridSize)
    this.direction = Directions.DOWN
    this.dimension = Dimensions.X
  }

  getGridBeforeMove(): Array<Array<Tile>> {
    return this.rotateGrid()
  }

  getGridAfterMove(newGrid: Array<Array<Tile>>): Array<Array<Tile>> {
    return this.rotateGrid(newGrid)
  }
  
}