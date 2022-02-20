// phil_osophie
// Status: WIP
// Twitter: @phil_osophie
// Fxhash: https://www.fxhash.xyz/u/phil_osophie
// Wallet: phil-osophie.tez

import Style from './style'

export default class BoilerplateStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.background = 230
    this.sw = s / 800
    p5.strokeWeight(this.sw)
    this.colors = p5.random([
      ['pink', 'lightblue', 'yellow', '#666'],
      ['#ef8354', '#136f63', '#4f5d75', '#999'],
      ['#118ab2', '#ffd166', '#ef476f', '#555']
    ])
  }

  beforeDraw () {
    const p5 = this._p5
    p5.background(this.background)

    // draw white sun
    p5.stroke(100)
    p5.fill('#f5f5f5')
    const [x, y] = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0]).map(x => x * this._s)
    const [xl] = this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY, 0]).map(x => x * this._s)
    const r = Math.abs(xl - x) * 2
    p5.circle(x, y, r * 1.1)
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    const p5 = this._p5
    const s = this._s
    const tp = tilePoints.map(p => p.copy().mult(this._s))
    const h = 10 * this.sw
    const t = 10 * this.sw
    const lp = tp.map(p => p.copy().add(p5.createVector(0, h)))
    const tile = () => {
      const dx = p5.random(-t, t)
      const dy = p5.random(-t, t)
      return [
        lp[0].x + dx,
        lp[0].y + dy,
        lp[1].x + dx,
        lp[1].y + dy,
        lp[2].x + dx,
        lp[2].y + dy,
        lp[3].x + dx,
        lp[3].y + dy
      ]
    }

    p5.noStroke()

    // colored tiles
    p5.fill(this.colors[0])
    p5.quad(...tile())

    p5.fill(this.colors[1])
    p5.quad(...tile())

    p5.fill(this.colors[2])
    p5.quad(...tile())

    p5.fill(this.colors[3])
    p5.quad(...tile())

    // original tile
    p5.fill('#fff')
    p5.stroke(120)
    p5.quad(tp[0].x, tp[0].y, tp[1].x, tp[1].y, tp[2].x, tp[2].y, tp[3].x, tp[3].y)

    // only on border tiles
    const drawLight = Math.abs(frontLeftCorner3DCoord.x + 0.5) === Math.abs(this._gridSizeX / 2) - 0.5

    if (drawLight && p5.random() < 0.5) {
      // lighter color in the back
      p5.stroke(Math.min(frontLeftCorner3DCoord.y * 3, this.background))

      // choose left or right point of tile
      const p0 = frontLeftCorner3DCoord.x < 0 ? tp[0] : tp[2]

      // get light height
      const p1 = p0.copy().add(0, -s / 4)
      p5.line(p0.x, p0.y, p1.x, p1.y)
      const p2 = p1.copy().add(-s / 2 * (p5.random() - 0.5), 0)
      p5.line(p1.x, p1.y, p2.x, p2.y)

      const c = p5.color(p5.random(this.colors))
      const r = p5.random(5, s / 30)

      // draw outer circle
      c.setAlpha(50)
      p5.fill(c)
      p5.noStroke()
      p5.circle(p2.x, p2.y, r * 4)

      // draw inner circle
      c.setAlpha(170)
      p5.fill(c)
      p5.stroke(80)
      p5.circle(p2.x, p2.y, r)
    }

    // draw some lines to the ground
    if (p5.random() < 0.3) {
      p5.stroke(Math.min(frontLeftCorner3DCoord.y * 3, this.background))

      const p0 = frontLeftCorner3DCoord.x < 0 ? tp[1] : tp[3]
      const newY = p5.random(0, s / 2)
      const p1 = p0.copy().add(p5.createVector(0, newY))
      p5.line(p0.x, p0.y, p1.x, p1.y)
      const p2 = p1.copy().add(p5.createVector(-s / 2 * (p5.random() - 0.5), 0))
      p5.line(p1.x, p1.y, p2.x, p2.y)

      const c = p5.color(p5.random(this.colors))
      c.setAlpha(170)
      p5.fill(c)
    }
  }

  afterDraw () {}

  static author () { return 'phil_osophie' }

  static name () { return 'Street Lights' }
}
