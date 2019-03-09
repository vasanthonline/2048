import 'mocha';
import { expect } from 'chai'
import Main from '../source/main'

describe('Grid-Up', () => {

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
  
})