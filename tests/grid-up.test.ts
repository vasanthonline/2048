import 'mocha';
import { expect } from 'chai'

import GridUp from '../source/grid-up'
import Tile from '../source/tile'

describe('Grid-Up', () => {

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
  
  it('Should initialize a empty move-up grid', () => {
    const grid = new GridUp(gridArray, gridSize)
    expect(JSON.parse(grid.toString())[0]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[1]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[2]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[3]).to.equal('0,0,0,0')
  })

  it('should initialize a 4x4 grid with random values inserted', () => {
    const grid = new GridUp(gridArray, gridSize).addRandomTileToGrid(2)

    const filteredGrid = grid.reduce((acc, row) => {
      row.forEach((tile) => {
        if(tile.value == 0) acc.push(tile)
      })
      return acc
    }, [])
    expect(filteredGrid.length).to.equal(14)
  })

  it('should return the rotated grid before move', () => {
    const grid = new GridUp(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    const gridData = gridArray.map((row) => row.map(tile => tile.value).join(','))
    expect(gridData[0]).to.equal('2,0,2,0')
    expect(gridData[1]).to.equal('0,4,2,2')
    expect(gridData[2]).to.equal('2,2,0,4')
    expect(gridData[3]).to.equal('0,2,4,0')
  })
    

  it('should move the grid up one level', () => {
    const grid = new GridUp(gridWithValuesArray, gridSize)
    const newGrid = grid.move()
    expect(newGrid[0][0].value).to.equal(4)
    expect(newGrid[0][1].value).to.equal(4)
    expect(newGrid[1][1].value).to.equal(4)
    expect(newGrid[0][2].value).to.equal(4)
    expect(newGrid[1][2].value).to.equal(4)
    expect(newGrid[0][3].value).to.equal(2)
    expect(newGrid[1][3].value).to.equal(4)
  })

})
