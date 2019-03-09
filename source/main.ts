import * as config from 'config'
import * as readline from 'readline'
import * as process from 'process'
import Grid from './grid'
import GridUp from './grid-up'
import GridDown from './grid-down'
import GridLeft from './grid-left'
import GridRight from './grid-right'
import Tile from './tile'
import { Directions, Commands, Messages } from './interface'

export default class Main {

  private grid: Array<Array<Tile>> = []
  
  constructor(private gridSize: number = config['GRID_SIZE']) {
    this.grid = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize)
      .fill(0)
      .map((value: number, colNumber: number) => new Tile(row[1], colNumber, value)))
      return grid
    }, [])
    this.grid = new Grid(this.grid, gridSize)
    .addRandomTileToGrid(parseInt(config['NEW_TILES_PER_TURN']) + 1)
  }

  getGrid(): string {
    return JSON.stringify(this.grid.map((row) => row.map(tile => tile.value).join(',')), null, 2)
  }

  move(direction: number) {
    switch(direction) {
      case Directions.LEFT:
        this.grid = new GridLeft(this.grid).move()
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


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const messageTemplate = '\x1b[32m%s\x1b[0m'
let main: Main
rl.on('line', async (input: string) => {
  const isValidInput = [Directions.DOWN, Directions.LEFT, Directions.RIGHT, Directions.UP].findIndex((dir) => dir == parseInt(input))
  const isExitCommand = Commands.exit.test(input)
  const isStartCommand = Commands.start.test(input)
  if(isStartCommand){
    console.log(messageTemplate, Messages.RECD_START)
    main = new Main(config['GRID_SIZE'])
    console.log(messageTemplate, Messages.GAME_STARTS(main.getGrid()))
    console.log(messageTemplate, Messages.DIRECTIONS_DOC)
    return
  }else if(isExitCommand){
    console.log(messageTemplate, Messages.RECD_EXIT)
    rl.close()
    return
  }else if(!main){
    console.log(messageTemplate, Messages.SEND_START)
    return
  }else if(isValidInput < 0){
    console.log(messageTemplate, Messages.INVALID_INPUT(input))
    return
  }
  if(main){
    console.log(messageTemplate, Messages.VALID_INPUT(input))
    main.move(parseInt(input))
    console.log(messageTemplate, `${main.getGrid()}`)
    return
  }else{
    console.log(messageTemplate, Messages.SEND_START)
    return
  }
})
console.log(messageTemplate, Messages.SEND_START)
