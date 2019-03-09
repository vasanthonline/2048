import * as config from 'config'
import Tile from './tile'
import Grid from './grid'
import { Directions, Dimensions } from './interface'

export default class GridRight extends Grid {

  constructor(grid: Array<Array<Tile>> = [], gridSize: number = config['GRID_SIZE']) {
    super(grid, gridSize)
    this.direction = Directions.RIGHT
    this.dimension = Dimensions.Y
  }

  getRowCopy(row: Array<Tile> = []): Array<Tile> {
    return super.getRowCopy(row).reverse()
  }

  isClosestTile(tileA: Tile, tileB: Tile): boolean {
    return tileA[this.dimension] - 1 == tileB[this.dimension]
  }

  getAllAvailableTiles(row: Array<Tile>, inputTile: Tile): Array<Tile> {
    return row.filter((tile: Tile) => (tile.value == 0 && tile[this.dimension] > inputTile[this.dimension]))
  }

  getClosestAvailableTiles(row: Array<Tile>, inputTile: Tile): Array<Tile> {
    const availableTiles = this.getAllAvailableTiles(row, inputTile)
    return availableTiles.reduce((acc: Array<Tile>, tile: Tile) => {
      const lastTile =  acc.length > 0 ? acc[acc.length - 1] : inputTile
      if(this.isClosestTile(tile, lastTile)) acc.push(tile)
      return acc
    }, []).reverse()
  }
  
}