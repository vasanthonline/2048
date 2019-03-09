import 'mocha';
import { expect } from 'chai'
import { Messages } from './../source/interface'

describe('Messages', () => {
  it('should return messages as per input', () => {
    expect(Messages.GAME_STARTS('grid')).to.equal(`Game starts.\n grid\n`)
    expect(Messages.INVALID_INPUT('input')).to.equal(`Recieved input. It is not a valid direction. ${Messages.DIRECTIONS_DOC}`)
    expect(Messages.VALID_INPUT('input')).to.equal(`Recieved input. Moving the grid...`)
  })
})