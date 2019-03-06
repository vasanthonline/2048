import 'mocha';
import { expect } from 'chai'

import Grid from './../source/grid'
import Tile from './../source/tile'

const gridSize = 3
const gridArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
    grid.push(new Array(gridSize).fill(0)
    .map((value: number, colNumber: number) => new Tile(row[1], colNumber, value)))
    return grid
  }, [])

describe('Grid', () => {
  
  it('Should initialize a empty grid', () => {
    const grid =  new Grid()
    expect(grid.toString()).to.equal(JSON.stringify([], null, 2))
  })

  it('Should initialize a 3x3 grid', () => {
    const grid =  new Grid(gridArray, gridSize)
    
    expect(JSON.parse(grid.toString())[0]).to.equal('0,0,0')
    expect(JSON.parse(grid.toString())[1]).to.equal('0,0,0')
    expect(JSON.parse(grid.toString())[2]).to.equal('0,0,0')

  })

  it('should initialize a 3x3 grid with random values inserted', () => {
    const grid =  new Grid(gridArray, gridSize).addRandomTileToGrid(2)

    const filteredGrid = grid.reduce((acc, row) => {
      row.forEach((tile) => {
        if(tile.value == 0) acc.push(tile)
      })
      return acc
    }, [])
    expect(filteredGrid.length).to.equal(7)
  })

})