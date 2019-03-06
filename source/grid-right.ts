import config from 'config'
import Tile from './tile'
import Grid from './grid'
import { Directions, Dimensions } from './interface'

export default class GridRight extends Grid {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config.get('GRID_SIZE')) {
    super(grid, gridSize)
    this.direction = Directions.RIGHT
    this.dimension = Dimensions.Y
  }
  
}