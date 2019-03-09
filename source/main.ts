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
    .addRandomTileToGrid(parseInt(config['NEW_TILES_PER_TURN']) + 1).grid
  }

  getGrid(): string {
    return JSON.stringify(this.grid.map((row) => row.map(tile => tile.value).join(',')), null, 2)
  }

  move(direction: number): {changed: boolean, grid: Array<Array<Tile>>} {
    let changed: boolean, movedGrid: {changed: boolean, grid: Array<Array<Tile>>}
    switch(direction) {
      case Directions.LEFT:
        movedGrid = new GridLeft(this.grid).move()
        changed = movedGrid.changed
        this.grid = movedGrid.grid
        break;
      case Directions.RIGHT:
        movedGrid = new GridRight(this.grid).move()
        changed = movedGrid.changed
        this.grid = movedGrid.grid
        break;
      case Directions.UP:
        movedGrid = new GridUp(this.grid).move()
        changed = movedGrid.changed
        this.grid = movedGrid.grid
        break;
      case Directions.DOWN:
        movedGrid = new GridDown(this.grid).move()
        changed = movedGrid.changed
        this.grid = movedGrid.grid
        break;
    }
    return {changed: changed, grid: this.grid}
  }
}


const CommandHandler = {
  start: () => {
    console.log(messageTemplate, Messages.RECD_START)
    main = new Main(config['GRID_SIZE'])
    console.log(messageTemplate, Messages.GAME_STARTS(main.getGrid()))
    console.log(messageTemplate, Messages.DIRECTIONS_DOC)
    return
  },
  exit: () => {
    console.log(messageTemplate, Messages.RECD_EXIT)
    rl.close()
    return
  },
  move: (input: string) => {
    return main && main.move(parseInt(input))
  },
  win: (grid: Array<Array<Tile>>) => {
    const grid2048 = grid.reduce((acc, row) => {
      row.forEach((tile) => {
        if(tile.value == config['WIN_NUMBER']) acc.push(tile)
      })
      return acc
    }, [])
    if(grid2048.length == 1 && grid2048[0] == config['WIN_NUMBER']){
      console.log(messageTemplate, Messages.GAME_WIN)
      rl.close()
      return true
    }
  },
  gameover: (grid: Array<Array<Tile>>) => {
    const zerosGrid = grid.reduce((acc, row) => {
      row.forEach((tile) => {
        if(tile.value == 0) acc.push(tile)
      })
      return acc
    }, [])
    if(zerosGrid.length == 0){
      console.log(messageTemplate, Messages.GAME_OVER)
      rl.close()
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
  if(isStartCommand)
    CommandHandler.start()
  else if(isExitCommand)
    CommandHandler.exit()
  else if(!main)
    return console.log(messageTemplate, Messages.SEND_START)
  else if(isValidInput < 0)
    return console.log(messageTemplate, Messages.INVALID_INPUT(input))
  
  console.log(messageTemplate, Messages.VALID_INPUT(input))
  const changes = CommandHandler.move(input)
  CommandHandler.win(changes.grid)
  if(!changes.changed)
    CommandHandler.gameover(changes.grid)
  console.log(messageTemplate, `${main.getGrid()}`)
})
console.log(messageTemplate, Messages.SEND_START)
