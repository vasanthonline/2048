export default class Tile {
  
  constructor(private _x: number, private _y: number, private _value: number = 0, private _isMerged: boolean = false){

  }

  get value() {
    return this._value
  }

  set value(newValue: number) {
    this._value = newValue
  }

  get x() {
    return this._x
  }

  set x(newX: number) {
    this._x = newX
  }

  get y() {
    return this._y
  }

  set y(newY: number) {
    this._y = newY
  }

  get isMerged() {
    return this._isMerged
  }

  set isMerged(isMergedNew: boolean) {
    this._isMerged = isMergedNew
  }
  
}