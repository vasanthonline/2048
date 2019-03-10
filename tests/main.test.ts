import 'mocha';
import { expect } from 'chai'
import * as config from 'config'
import Tile from './../source/tile'
import Main, { CommandHandler } from '../source/main'
import { Directions } from '../source/interface';

describe('Main', () => {

  let gridSize: number, gridArray: Array<Array<Tile>>
  let gridWithValuesArray: Array<Array<Tile>>

  beforeEach(() => {
    gridSize = 4
    gridArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
    grid.push(new Array(gridSize).fill(0)
    .map((value: number, colNumber: number) => new Tile(row[1], colNumber, value)))
    return grid
    }, [])

    // gridWithValuesArray = [
    //   "2,0,2,0",
    //   "0,4,2,2",
    //   "2,2,0,4",
    //   "0,2,4,0"
    // ]
    gridWithValuesArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize).fill(0)
      .map((value: number, colNumber: number) => {
        switch(row[1]){
          case 0:
            return new Tile(row[1], colNumber, colNumber % 2 == 0 ? 2 : 0)
          case 1:
            return new Tile(row[1], colNumber, colNumber >= 2 ? 2 : (colNumber == 1 ? 4: 0))
          case 2:
            return new Tile(row[1], colNumber, colNumber <= 1 ? 2 : (colNumber == 3 ? 4 : 0))
          case 3:
            return new Tile(row[1], colNumber, colNumber == 1 ? 2 : (colNumber == 2 ? 4 : 0))
        }
      }))
      return grid
      }, [])
  })
  
  afterEach(() => {
    gridSize = 0
    gridArray = gridWithValuesArray = []
  })

  it('should initialize a 4x4 grid', () => {
    const main = new Main(4)
    const grid = JSON.parse(main.getGrid())
    const filteredGrid = grid.reduce((acc: Array<string>, row: string) => {
      row.split(',').forEach((tile) => {
        if(parseInt(tile) == 0) acc.push(tile)
      })
      return acc
    }, [])
    expect(filteredGrid.length).to.equal(14)
  })

  it('should move grid when instructed', () => {
    const main = new Main(4)
    const oldGrid = main.getGrid()
    main.move(Directions.LEFT)
    main.move(Directions.RIGHT)
    main.move(Directions.UP)
    const changes = main.move(Directions.DOWN)
    expect(changes.changed).to.equal(true)
    expect(main.getGrid()).to.not.equal(oldGrid)
  })

  it('should return true whether there is one more move possible', () => {
    expect(CommandHandler.canMove(gridWithValuesArray)).to.equal(true)
  })

  it('should return false whether there is no more move possible', () => {
    const gridArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize).fill(0)
      .map((value: number, colNumber: number) => new Tile(row[1], colNumber, colNumber + (row[1] * 4))))
      return grid
      }, [])
    expect(CommandHandler.canMove(gridArray)).to.equal(false)
  })

  it('should not game over when there is moves left', () => {
    const gridArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize).fill(0)
      .map((value: number, colNumber: number) => new Tile(row[1], colNumber, colNumber + (row[1] * 4))))
      return grid
      }, [])
      expect(CommandHandler.gameover(gridArray)).to.equal(false)
  })

  it('should declare game win when 2048 appears', () => {
    const gridArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize).fill(0)
      .map((value: number, colNumber: number) => new Tile(row[1], colNumber, colNumber + (row[1] * 4))))
      return grid
      }, [])
      gridArray[0][3].value = config['WIN_NUMBER']
      expect(CommandHandler.gameover(gridArray)).to.equal(false)
  })

  it('should start game without errors', () => {
    expect(CommandHandler.start()).to.equal(true)
  })

  it('should exit game without errors', () => {
    expect(CommandHandler.exit()).to.equal(true)
  })
  
})