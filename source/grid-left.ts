import * as config from 'config'
import Tile from './tile'
import Grid from './grid'
import { Directions, Dimensions } from './interface'

export default class GridLeft extends Grid {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config['GRID_SIZE']) {
    super(grid, gridSize)
    this.direction = Directions.LEFT
    this.dimension = Dimensions.Y
  }

  isClosestTile(tileA: Tile, tileB: Tile): boolean {
    return tileA[this.dimension] + 1 == tileB[this.dimension]
  }
  
  getAllAvailableTiles(row: Array<Tile> = [], inputTile: Tile): Array<Tile> {
    return row.filter((tile: Tile) => (tile.value == 0 && tile[this.dimension] < inputTile[this.dimension]))
  }

  getClosestAvailableTiles(row: Array<Tile> = [], inputTile: Tile): Array<Tile> {
    const availableTiles = this.getAllAvailableTiles(row, inputTile)
    const sortedAvailableTiles = availableTiles.reverse()
    return sortedAvailableTiles.reduce((acc: Array<Tile>, tile: Tile) => {
      const lastTile = acc.length > 0 ? acc[0] : inputTile
      if(this.isClosestTile(tile, lastTile)) acc.unshift(tile)
      return acc
    }, [])
  }
  
}