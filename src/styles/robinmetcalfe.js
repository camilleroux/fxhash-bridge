// Camille Roux
// Status: WIP // "WIP", "Ready"
// Wallet: tz.....

import Style from './style'
import { FXInit, FXRandomBetween, FXRandomIntBetween, getWeightedOption } from '@liamegan1/fxhash-helpers'

export default class RobinMetcalfeStyle extends Style {
  
  beforeDraw () {
    this._p5.background('#011627')
  }
  
  // get tile dimensions
  dims(t) {
    return this._p5.createVector(t[1].x - t[0].x, t[1].y - t[0].y)
  }

  drawTile (t, f, isBorder) {

    this._p5.stroke('#444')
    this._p5.fill('#333')


    // Build a fake perspective unprojection
    // (can do some interesting things with this)

    // Get ratio difference between top and bottom length
    const distanceTop = this._p5.dist(t[1].x, t[1].y, t[2].x, t[2].y)
    const distanceBottom = this._p5.dist(t[3].x, t[3].y, t[0].x, t[0].y)    
    const height = t[1].y - t[0].y
    const offset = t[1].x - t[0].x
    const widthDifference = distanceBottom - distanceTop

    const ratio = distanceTop / distanceBottom

    this._p5.quad(
      t[0].x * this._s, t[0].y * this._s,
      t[1].x * this._s, t[1].y * this._s,
      t[2].x * this._s, t[2].y * this._s,
      t[3].x * this._s, t[3].y * this._s
    )

    let gridRes = FXRandomIntBetween(16, 32)

    const xRes = (1 / this._gridSizeX) / gridRes
    const yRes = (1 / this._gridSizeY) / gridRes

    this._p5.stroke('#fff')

    const offsetPart = offset / gridRes
    const heightPart = height / gridRes
    const distanceBottomPart = distanceBottom / gridRes

    const fakeHeight = FXRandomIntBetween(10, 250)

    for(let y = 0; y <= gridRes; y++) {
      const xStart = t[0].x + (offsetPart * y)
      const _y = t[0].y + (heightPart * y)
      for(let x = 0; x <= gridRes; x++) {
        
        const _x = xStart + (
                              (
                                (distanceBottom / gridRes) -
                                ( (widthDifference / gridRes) * (y / gridRes) )
                              )
                              * x)

        let raise = ((_y * this._s) + (_y * ( this._s / 4))) / fakeHeight
        //raise = 0
        this._p5.strokeWeight(_y)
        this._p5.circle(_x * this._s, _y * this._s - raise, _y)

        if(x == 0 && y == 0) {
          this._p5.line(_x * this._s, _y * this._s - raise, t[0].x * this._s, t[0].y * this._s)
        }
        else if(x == 0 && y == gridRes) {
          this._p5.line(_x * this._s, _y * this._s - raise, t[1].x * this._s, t[1].y * this._s)
        }
        else if(x == gridRes && y == gridRes) {
          this._p5.line(_x * this._s, _y * this._s - raise, t[2].x * this._s, t[2].y * this._s)
        }
        else if(x == gridRes && y == 0) {
          this._p5.line(_x * this._s, _y * this._s - raise, t[3].x * this._s, t[3].y * this._s)
        }
        
      }
    }

  }

  afterDraw () {}

  static author () { return 'Robin Metcalfe' }

  static name () { return 'Robin' }
}
