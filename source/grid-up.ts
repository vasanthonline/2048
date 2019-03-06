import config from 'config'
import Tile from './tile'
import GridLeft from './grid-left'
import { Directions, Dimensions } from './interface'

export default class GridUp extends GridLeft {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config.get('GRID_SIZE')) {
    super(grid, gridSize)
    this.direction = Directions.UP
    this.dimension = Dimensions.X
  }
  
}