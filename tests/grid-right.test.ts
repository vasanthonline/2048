import 'mocha';
import { expect } from 'chai'

import GridRight from './../source/grid-right'
import Tile from './../source/tile'

describe('Grid-Right', () => {

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
    //   "4,4,2,2",
    //   "0,2,0,4",
    //   "2,0,0,0"
    // ]
    gridWithValuesArray = new Array(gridSize).fill(0).reduce((grid, ...row) => {
      grid.push(new Array(gridSize).fill(0)
      .map((value: number, colNumber: number) => {
        switch(row[1]){
          case 0:
            return new Tile(row[1], colNumber, colNumber % 2 == 0 ? 2 : 0)
          case 1:
            return new Tile(row[1], colNumber, colNumber >= 2 ? 2 : 4)
          case 2:
            return new Tile(row[1], colNumber, colNumber == 1 ? 2 : (colNumber == 3 ? 4 : 0))
          case 3:
            return new Tile(row[1], colNumber, colNumber == 0 ? 2 : 0)
        }
      }))
      return grid
      }, [])
  })
  
  afterEach(() => {
    gridSize = 0
    gridArray = gridWithValuesArray = []
  })
  
  it('Should initialize a empty right grid', () => {
    const grid = new GridRight(gridArray, gridSize)
    expect(JSON.parse(grid.toString())[0]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[1]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[2]).to.equal('0,0,0,0')
    expect(JSON.parse(grid.toString())[3]).to.equal('0,0,0,0')
  })

  it('should initialize a 4x4 grid with random values inserted', () => {
    const grid = new GridRight(gridArray, gridSize).addRandomTileToGrid(2).grid

    const filteredGrid = grid.reduce((acc, row) => {
      row.forEach((tile) => {
        if(tile.value == 0) acc.push(tile)
      })
      return acc
    }, [])
    expect(filteredGrid.length).to.equal(14)
  })

  it('should fetch all available tiles for given tile', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let availableTiles = grid.getAllAvailableTiles(gridArray[0], gridArray[0][2])
    expect(availableTiles.length).to.equal(1)
    expect(availableTiles[0].x).to.equal(0)
    expect(availableTiles[0].y).to.equal(3)

    availableTiles = grid.getAllAvailableTiles(gridArray[1], gridArray[1][2])
    expect(availableTiles.length).to.equal(0)

    availableTiles = grid.getAllAvailableTiles(gridArray[2], gridArray[2][1])
    expect(availableTiles.length).to.equal(1)
    expect(availableTiles[0].x).to.equal(2)
    expect(availableTiles[0].y).to.equal(2)

    availableTiles = grid.getAllAvailableTiles(gridArray[3], gridArray[3][0])
    expect(availableTiles.length).to.equal(3)
    expect(availableTiles[0].x).to.equal(3)
    expect(availableTiles[0].y).to.equal(1)
    expect(availableTiles[1].x).to.equal(3)
    expect(availableTiles[1].y).to.equal(2)
    expect(availableTiles[2].x).to.equal(3)
    expect(availableTiles[2].y).to.equal(3)
  })

  it('should fetch only closest available tiles for given tile', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let availableTiles = grid.getClosestAvailableTiles(gridArray[0], gridArray[0][2])
    expect(availableTiles.length).to.equal(1)
    expect(availableTiles[0].x).to.equal(0)
    expect(availableTiles[0].y).to.equal(3)

    availableTiles = grid.getClosestAvailableTiles(gridArray[1], gridArray[1][2])
    expect(availableTiles.length).to.equal(0)

    availableTiles = grid.getClosestAvailableTiles(gridArray[2], gridArray[2][1])
    expect(availableTiles.length).to.equal(1)
    expect(availableTiles[0].x).to.equal(2)
    expect(availableTiles[0].y).to.equal(2)

    availableTiles = grid.getClosestAvailableTiles(gridArray[3], gridArray[3][0])
    expect(availableTiles.length).to.equal(3)
    expect(availableTiles[0].x).to.equal(3)
    expect(availableTiles[0].y).to.equal(3)
    expect(availableTiles[1].x).to.equal(3)
    expect(availableTiles[1].y).to.equal(2)
    expect(availableTiles[2].x).to.equal(3)
    expect(availableTiles[2].y).to.equal(1)
  })

  it('should find whether two tiles are close enough to merge', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let closestTile = grid.isClosestTile(gridArray[0][2], gridArray[0][1])
    expect(closestTile).to.equal(true)

    closestTile = grid.isClosestTile(gridArray[1][3], gridArray[1][1])
    expect(closestTile).to.equal(false)

    closestTile = grid.isClosestTile(gridArray[2][1], gridArray[2][0])
    expect(closestTile).to.equal(true)

    closestTile = grid.isClosestTile(gridArray[3][2], gridArray[3][0])
    expect(closestTile).to.equal(false)
  })

  it('should get the move tile index for the given tile', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let moveTileIndex = grid.getMoveTileIndex(gridArray[0], gridArray[0][2])
    expect(moveTileIndex).to.equal(3)
    
    moveTileIndex = grid.getMoveTileIndex(gridArray[1], gridArray[1][2])
    expect(moveTileIndex).to.equal(-1)

    moveTileIndex = grid.getMoveTileIndex(gridArray[2], gridArray[2][1])
    expect(moveTileIndex).to.equal(2)

    moveTileIndex = grid.getMoveTileIndex(gridArray[3], gridArray[3][0])
    expect(moveTileIndex).to.equal(3)
  })

  it('should get the merge tile index for the given tile', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let moveTileIndex = grid.getMoveTileIndex(gridArray[0],gridArray[0][0])
    let mergeTileIndex = grid.getMergeTileIndex(gridArray[0], gridArray[0][moveTileIndex], gridArray[0][0])
    expect(mergeTileIndex).to.equal(2)
    
    moveTileIndex = grid.getMoveTileIndex(gridArray[1], gridArray[1][0])
    mergeTileIndex = grid.getMergeTileIndex(gridArray[1], gridArray[1][moveTileIndex], gridArray[1][0])
    expect(mergeTileIndex).to.equal(1)

    moveTileIndex = grid.getMoveTileIndex(gridArray[2], gridArray[2][1])
    mergeTileIndex = grid.getMergeTileIndex(gridArray[2], gridArray[2][moveTileIndex], gridArray[2][1])
    expect(mergeTileIndex).to.equal(-1)

    moveTileIndex = grid.getMoveTileIndex(gridArray[3], gridArray[3][0])
    mergeTileIndex = grid.getMergeTileIndex(gridArray[3], gridArray[3][moveTileIndex], gridArray[3][0])
    expect(mergeTileIndex).to.equal(-1)
  })

  it('should merge or move tiles in row for the given tile', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const gridArray = grid.getGridBeforeMove()
    
    let row = grid.moveOrMergeTilesInRow(gridArray[0], gridArray[0][0]).row
    expect(row[0].value).to.equal(0)
    expect(row[0].isMerged).to.equal(false)
    expect(row[2].value).to.equal(4)
    expect(row[2].isMerged).to.equal(true)
    
    row = grid.moveOrMergeTilesInRow(gridArray[1], gridArray[1][0]).row
    expect(row[1].value).to.equal(8)
    expect(row[1].isMerged).to.equal(true)

    row = grid.moveOrMergeTilesInRow(gridArray[2], gridArray[2][1]).row
    expect(row[1].value).to.equal(0)
    expect(row[1].isMerged).to.equal(false)
    expect(row[2].value).to.equal(2)
    expect(row[2].isMerged).to.equal(false)

    row = grid.moveOrMergeTilesInRow(gridArray[3], gridArray[3][0]).row
    expect(row[3].value).to.equal(2)
    expect(row[3].isMerged).to.equal(false)
    expect(row[0].value).to.equal(0)
    expect(row[0].isMerged).to.equal(false)
  })

  it('should move the grid to the right', () => {
    const grid = new GridRight(gridWithValuesArray, gridSize)
    const newGrid = grid.move().grid
    expect(newGrid[0][3].value).to.equal(4)
    expect(newGrid[1][2].value).to.equal(8)
    expect(newGrid[1][3].value).to.equal(4)
    expect(newGrid[2][2].value).to.equal(2)
    expect(newGrid[2][3].value).to.equal(4)
    expect(newGrid[3][3].value).to.equal(2)
  })

})
