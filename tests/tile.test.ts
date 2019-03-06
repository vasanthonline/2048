import 'mocha';
import { expect } from 'chai'

import Tile from './../source/tile'

describe('Tile', () => {
  
  it('Should initialize a new tile', () => {
    const tile =  new Tile(1, 1)
    expect(tile.x).to.equal(1)
    expect(tile.y).to.equal(1)
    expect(tile.value).to.equal(0)
    expect(tile.isMerged).to.equal(false)
  })

  it('Should modify tile value using setters', () => {
    const tile =  new Tile(2, 2, 3)

    tile.x = 1
    tile.y = 1
    tile.value = 2
    tile.isMerged = true

    expect(tile.x).to.equal(1)
    expect(tile.y).to.equal(1)
    expect(tile.value).to.equal(2)
    expect(tile.isMerged).to.equal(true)

  })

})