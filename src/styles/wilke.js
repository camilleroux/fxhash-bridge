// Claus O. Wilke
// Status: Ready
// Twitter: @ClausWilke
// Fxhash: https://www.fxhash.xyz/u/clauswilke
// Wallet: tz1XTr7d3FZ19KndZ1HX3iav8fqKeZwGx8bZ

/*
 The code for WilkeStyle is Copyright (C) 2022 by Claus O. Wilke.
 
 I grant Camille Roux a permanent, irrevocable, non-exclusive,
 license to release this code as part of the BRIDGE project under
 the licensing terms of the entire project.
 
 For all other uses, the code for WilkeStyle is released under
 CC-BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import Style from './style'

export default class WilkeStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    
    // calculate vanishing points
    this.vanishing = this._projectionCalculator3d.getProjectedPoint([0, gridSizeY, 0])

    let i = 0
    do {
      this.centerx = this._p5.random(0.47, 0.53)
      this.centery = this._p5.random(0.28, 0.35)
      this.radius = this._p5.random(0.20, 0.27)
  
      if (Math.abs(this.centery - this.radius) < 0.05) this.centery += 0.05
      i += 1
    } while (i < 25 && this._p5.dist(this.centerx, this.centery, this.vanishing[0], this.vanishing[1]) > 0.8 * this.radius)

    this.strokescale = this._s / 500

    let palette = this._p5.random(['red', 'green', 'purple', 'light', 'light', 'light', 'dark', 'dark', 'dark', 'dark', 'dark'])
    let highlight = this._p5.random(['red', 'blue'])

    // light scheme
    this.bgfill = '#FEFAF0'
    this.bgstipple = '#E9E5DB'
    this.circlefill = '#202020'
    this.circlestipple = '#404040'
    this.inthalostipple = this.bgfill
    
    this.floordark = '#000000'
    this.floorlight = this.bgfill
    this.borderdark = '#811012'
    this.borderlight = '#AB4D4E'

    if (highlight === 'blue') {
      this.borderdark = '#093F6E' // '#114D84'
      this.borderlight = '#406496' // '#5878A9'
    }

    // dark scheme
    if (palette === 'dark') {
      this.bgfill = '#202020'
      this.bgstipple = '#050505'
      this.circlefill = '#FEFAF0'
      this.circlestipple = '#E9E5DB'
      this.inthalostipple = this.bgstipple
      this.floorlight = this.circlestipple
      
      if (highlight === 'blue') {
        this.borderlight = '#7287AD'
      }
    } else if (palette === 'red') {
      this.bgfill = '#202020'
      this.bgstipple = '#383838'
      this.inthalostipple = '#FBF9F3'
      this.circlefill = '#9E191A'
      this.circlestipple = '#B32829'
      this.floordark = '#430909'
      this.floorlight = '#900E0F'
      this.borderlight = this.inthalostipple
      this.borderdark = this.floordark
    } else if (palette === 'green') {
      this.bgfill = '#E9EDDA'
      this.bgstipple = '#BCCABA'
      this.inthalostipple = '#F7FBF4'
      this.circlefill = '#164A0A'
      this.circlestipple = '#446739'
      this.floordark = '#164A0A'
      this.floorlight = '#C4C094'
      this.borderdark = '#391C0F'
      this.borderlight = this.floorlight
    } else if (palette === 'purple') {
      this.bgfill = '#1E226D'
      this.bgstipple = '#682025'
      this.inthalostipple = '#000000'
      this.circlefill = '#F8E921'
      this.circlestipple = '#EA9E33'
      this.floordark = '#6A1966'
      this.floorlight = '#FEEF24'
      this.borderdark = '#111661'
      this.borderlight = '#B5AF83'
    }
    
    // swap floor and border colors 25% of the time
    if (this._p5.random() < 0.25) {
      let temp = this.floordark
      this.floordark = this.borderdark
      this.borderdark = temp
    
      temp = this.floorlight
      this.floorlight = this.borderlight
      this.borderlight = temp
    }
  }
  
  drawPointInterior (x, y) {
    if (this._p5.dist(x, y, this.centerx, this.centery) < this.radius) {
      this._p5.point(x * this._s, y * this._s)
    }
  }
  drawPointExterior (x, y) {
    if (this._p5.dist(x, y, this.centerx, this.centery) >= this.radius) {
      this._p5.point(x * this._s, y * this._s)
    }
  }
  drawPointHalfClip (x, y) {
    if (y > this.centery || this._p5.dist(x, y, this.centerx, this.centery) < this.radius) {
      this._p5.point(x * this._s, y * this._s)
    }
  }
  
  drawHaloInterior (x0, y0, radius, sd, col, n) {
    this._p5.stroke(col)
    this._p5.strokeWeight(.5 * this.strokescale)
    for (let i = 0; i < n; i++) {
      let x = this._p5.randomGaussian(x0, sd * radius)
      let y = this._p5.randomGaussian(y0, sd * radius)
      if (this._p5.dist(x, y, x0, y0) >= radius) {
        this.drawPointInterior(x, y)
      }
    }
  }
  
  // check whether a new proposed interior angle is too close to existing ones
  checkIntAngle (theta) {
    for (let kappa of this.intAngles) {
      if (Math.abs(theta - kappa) < 6.283185 * 30 / 360)
        return true
    }
    return false
  }
  
  drawRandomHaloInterior () {
    let theta
    let i = 0
    do {
      theta = 6.283185 * this._p5.random(-20, 200) / 360
      i += 1
    } while(i < 25 && this.checkIntAngle(theta))
    this.intAngles.push(theta)
    let r = 1.1 * this.radius * Math.sqrt(this._p5.random(.1, 1))
    let x = r * Math.cos(theta) + this.centerx
    let y = -r * Math.sin(theta) + this.centery
    let radius = this._p5.random(.1, .26)
    radius *= radius
    let n = 200000 * radius
    this.drawHaloInterior(x, y, radius, .35, this.inthalostipple, n)
  }
  
  beforeDraw () {
    this._p5.background(this.bgfill)
    
    // canvas background stippling
    this._p5.stroke(this.bgstipple)
    this._p5.strokeWeight(.5 * this.strokescale)
    let n = 250
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = (i + 0.5) / n
        x = x*x*(3-2*x) + this._p5.randomGaussian(0, 0.4/n)
        let y = (j + 0.5) / n
        y = y*y*(3-2*y) + this._p5.randomGaussian(0, 0.4/n)
        this._p5.point(x * this._s, y * this._s)
      }
    }

    
    this._p5.noStroke()
    this._p5.fill(this.circlefill)
    this._p5.circle(this.centerx * this._s, this.centery * this._s, 2 * this.radius * this._s)

    // interior background stippling
    this._p5.stroke(this.circlestipple)
    this._p5.strokeWeight(.5 * this.strokescale)
    n = 800 * this.radius
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = this.centerx - this.radius + 2*(i/n)*this.radius
        let y = this.centery - this.radius + 2*(j/n)*this.radius
        x = x + this._p5.randomGaussian(0, 0.5/n)
        y = y + this._p5.randomGaussian(0, 0.5/n)
        this.drawPointInterior(x, y)
      }
    }
    
    // halo around center circle
    this._p5.stroke(this.circlestipple)
    this._p5.strokeWeight(0.5*this.strokescale)
    for (let i = 0; i < 800000; i++) {
      let x = this._p5.randomGaussian(this.centerx, 0.3*this.radius)
      let y = this._p5.randomGaussian(this.centery, 0.3*this.radius)
      this.drawPointExterior(x, y)
    }
    
    let k = this._p5.random([2, 3, 4, 5])
    this.intAngles = []
    for (let i = 0; i < k; i++) {
      this.drawRandomHaloInterior()
    }
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    let mean = frontLeftCorner3DCoord.copy()
    mean.add(this._p5.createVector(0.5, 0.5, 0))
    
    // y distance in uv coords
    let dy = tilePoints[0].y - tilePoints[2].y
    // highlight borders
    let darkcol = isBorder ? this._p5.color(this.borderdark) : this._p5.color(this.floordark)
    let lightcol = isBorder ? this._p5.color(this.borderlight) : this._p5.color(this.floorlight)
    let alpha = 255
    if (10*dy < .2) {
      alpha = 1275*10*dy
    }
    darkcol.setAlpha(alpha)
    let sw = 2*Math.max(10*dy, .1) * this.strokescale
    this._p5.strokeWeight(sw)
    let off = 0.5/this._s
    // number of points along one dimension
    
    let n = Math.sqrt(Math.max(600*(1 - 0.02*frontLeftCorner3DCoord.y), 9))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = (i + 0.5)/n + this._p5.randomGaussian(0, 0.2/n) - .5
        let y = (j + 0.5)/n + this._p5.randomGaussian(0, 0.2/n) - .5
        let p = this._projectionCalculator3d.getProjectedPoint([x + mean.x, y + mean.y, mean.z])
        this._p5.stroke(lightcol)
        this.drawPointHalfClip(p[0] + off, p[1] + off)
        this._p5.stroke(darkcol)
        this.drawPointHalfClip(p[0], p[1])
      }
    }
  }

  afterDraw () {
  }

  static author () { return 'Claus O. Wilke' }

  static name () { return 'Into another world' }
}
