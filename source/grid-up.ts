import * as config from 'config'
import Tile from './tile'
import GridLeft from './grid-left'
import { Directions, Dimensions } from './interface'

export default class GridUp extends GridLeft {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config['GRID_SIZE']) {
    super(grid, gridSize)
    this.direction = Directions.UP
    this.dimension = Dimensions.X
  }

  getGridBeforeMove(): Array<Array<Tile>> {
    return this.rotateGrid()
  }

  getGridAfterMove(newGrid: Array<Array<Tile>>): Array<Array<Tile>> {
    return this.rotateGrid(newGrid)
  }
  
}