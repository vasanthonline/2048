import * as config from 'config'
import Tile from './tile'
import { Directions } from './interface';

export default class Grid {

  protected direction: number = -1
  protected dimension: string

  constructor(protected  grid: Array<Array<Tile>>  = [], protected gridSize: number = config.get('GRID_SIZE')) {}

  addRandomTileToGrid(numberOfValues: number = config.get('NEW_TILES_PER_TURN')): Array<Array<Tile>> {
    new Array(numberOfValues).fill(0).forEach(() => {
      for(const i in (new Array(this.gridSize * this.gridSize).fill(0))){
        const x = Math.floor(Math.random() * this.gridSize)
        const y = Math.floor(Math.random() * this.gridSize)
        if(this.grid[x][y].value == 0){
          this.grid[x][y].value = Math.random() < 0.9 ? 2 : 4
          break
        }
      }
    })
    return this.grid
  }

  toString(): string {
    return JSON.stringify(this.grid.map((row) => row.map(tile => tile.value).join(',')), null, 2)
  }

}