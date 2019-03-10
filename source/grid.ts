import * as config from 'config'
import Tile from './tile'
import { GridResponse, RowResponse } from './interface'

export default class Grid {

  protected direction: number = -1
  protected dimension: string

  constructor(protected  grid: Array<Array<Tile>>  = [], protected gridSize: number = config['GRID_SIZE']) {}

  addRandomTileToGrid(numberOfValues: number = config['NEW_TILES_PER_TURN']): GridResponse {
    let added = false
    new Array(numberOfValues).fill(0).forEach(() => {
      for(const i in (new Array(this.gridSize * this.gridSize).fill(0))){
        const x = Math.floor(Math.random() * this.gridSize)
        const y = Math.floor(Math.random() * this.gridSize)
        if(this.grid[x][y].value == 0){
          this.grid[x][y].value = Math.random() < 0.9 ? 2 : 4
          added = true
          break
        }
      }
    })
    return {changed: added, grid: this.grid}
  }

  move(): GridResponse {
    let moved = false
    const grid = this.getGridBeforeMove()
    const newGrid = grid.map((row: Array<Tile>, rowNumber: number) => {
      const defaultRow = this.getRowCopy(row)
      return defaultRow.reduce((newRow: Array<Tile>, tile: Tile, tileIndex: number) => {
        const changes = this.moveOrMergeTilesInRow(newRow, tile)
        moved = moved || changes.changed
        return changes.row
      }, this.getRowCopy(row))
    })
    this.grid = this.getGridAfterMove(newGrid)
    if(moved)
      this.grid = this.addRandomTileToGrid(config['NEW_TILES_PER_TURN']).grid
    return {'changed': moved, 'grid': this.grid}
  }

  getGridBeforeMove(): Array<Array<Tile>> {
    return this.grid
  }

  getGridAfterMove(newGrid: Array<Array<Tile>> = this.grid): Array<Array<Tile>> {
    return newGrid.map((row: Array<Tile>) => row.map((tile: Tile) => new Tile(tile.x, tile.y, tile.value)))
  }

  getRowCopy(row: Array<Tile> = []): Array<Tile> {
    return row.map((tile: Tile) => new Tile(tile.x, tile.y, tile.value))
  }

  moveOrMergeTilesInRow(row: Array<Tile> = [], inputTile: Tile): RowResponse {
    let changed = false
    const moveTileIndex = this.getMoveTileIndex(row, inputTile)
    const mergedTileIndex = this.getMergeTileIndex(row, row[moveTileIndex], inputTile)
    if(mergedTileIndex >= 0){
      changed = true
      row[mergedTileIndex].value = inputTile.value * 2
      row[inputTile[this.dimension]].value = 0
      row[mergedTileIndex].isMerged = true
    }else if(moveTileIndex >= 0){
      changed = (row[moveTileIndex].value != inputTile.value) && true
      row[moveTileIndex].value = inputTile.value
      row[inputTile[this.dimension]].value = 0
      row[moveTileIndex].isMerged = false
    }
    return {'changed': changed , 'row': row.sort((tileA: Tile, tileB: Tile) => tileA[this.dimension] - tileB[this.dimension])}
  }

  getMergeTileIndex(row: Array<Tile> = [], movedTile: Tile, inputTile: Tile) {
    const closestTileIndex = row.findIndex((rowTile: Tile) => this.isClosestTile(rowTile, movedTile ? movedTile : inputTile))
    return ((closestTileIndex >= 0 && row[closestTileIndex].value === inputTile.value && (!row[closestTileIndex].isMerged)) ? closestTileIndex : -1)
  }

  getMoveTileIndex(row: Array<Tile> = [], inputTile: Tile) {
    const availableTiles = this.getClosestAvailableTiles(row, inputTile)
    return row.findIndex((rowTile: Tile) => rowTile[this.dimension] == (availableTiles[0] || {})[this.dimension])
  }

  rotateGrid(grid: Array<Array<Tile>> = this.grid): Array<Array<Tile>> {
    return grid.reduce((acc: Array<Array<Tile>>, row: Array<Tile>, rowIx: number) => {
      row.forEach((tile: Tile, colIx: number) => {
        acc[colIx] = acc[colIx] || []
        acc[colIx].push(new Tile(tile.x, tile.y, tile.value))
      })
      return acc
    },[])
  }

  isClosestTile(tileA: Tile, tileB: Tile): boolean {
    return false
  }

  getAllAvailableTiles(row: Array<Tile>, inputTile: Tile): Array<Tile> {
    return []
  }

  getClosestAvailableTiles(row: Array<Tile>, inputTile: Tile): Array<Tile> {
    return []
  }

  toString(): string {
    return JSON.stringify(this.grid.map((row) => row.map(tile => tile.value).join(',')), null, 2)
  }

}