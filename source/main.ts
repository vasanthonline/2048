import config from 'config'
import Grid from './grid'
import GridUp from './grid-up'
import GridDown from './grid-down'
import GridLeft from './grid-left'
import GridRight from './grid-right'
import Tile from './tile'
import { Directions } from './interface'

export default class Main {

  private grid: Array<Array<Tile>> = []
  
  constructor(private gridSize: number = config.get('GRID_SIZE')) {
    this.grid = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize)
      .fill(0)
      .map((value: number, colNumber: number) => new Tile(row[1], colNumber, value)))
      return grid
    }, [])
    this.grid = new Grid(this.grid, gridSize)
    .addRandomTileToGrid(parseInt(config.get('NEW_TILES_PER_TURN')) + 1)
  }

  getGrid(): string {
    return JSON.stringify(this.grid.map((row) => row.map(tile => tile.value).join(',')), null, 2)
  }

  move(direction: number) {
    switch(direction) {
      case Directions.LEFT:
        this.grid = new GridRight(this.grid).move()
        break;
      case Directions.RIGHT:
        this.grid = new GridRight(this.grid).move()
        break;
      case Directions.UP:
        this.grid = new GridUp(this.grid).move()
        break;
      case Directions.DOWN:
        this.grid = new GridDown(this.grid).move()
        break;
    }
  }
}

console.log('************************GRID-0*********************')
const main = new Main(config.get('GRID_SIZE'))
console.log(main.getGrid())

console.log('************************GRID-1-LEFT*********************')

main.move(Directions.LEFT)
console.log(main.getGrid())
console.log('************************GRID-2-RIGHT*********************')

main.move(Directions.RIGHT)
console.log(main.getGrid())
console.log('************************GRID-3-UP*********************')

main.move(Directions.UP)
console.log(main.getGrid())
console.log('************************GRID-4-DOWN*********************')

main.move(Directions.DOWN)
console.log(main.getGrid())
console.log('************************GRID-5-LEFT*********************')

main.move(Directions.LEFT)
console.log(main.getGrid())
console.log('************************GRID-6-RIGHT*********************')

main.move(Directions.RIGHT)
console.log(main.getGrid())
console.log('************************GRID-7-UP*********************')

main.move(Directions.UP)
console.log(main.getGrid())
console.log('************************GRID-8-DOWN*********************')

main.move(Directions.DOWN)
console.log(main.getGrid())
console.log('************************GRID-9-LEFT*********************')

main.move(Directions.LEFT)
console.log(main.getGrid())
console.log('************************GRID-10-RIGHT*********************')

main.move(Directions.RIGHT)
console.log(main.getGrid())
console.log('************************GRID-11-UP*********************')

main.move(Directions.UP)
console.log(main.getGrid())
console.log('************************GRID-12-DOWN*********************')

main.move(Directions.DOWN)
console.log(main.getGrid())
console.log('************************GRID-13-END*********************')