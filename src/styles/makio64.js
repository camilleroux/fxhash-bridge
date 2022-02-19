// David Ronai - Makio64
// Status: WIP
// Twitter: @makio64
// Fxhash: https://www.fxhash.xyz/u/Makio64
// Wallet: tz2Xbx5F7w6f8d5mrf5mCQSBT46veDysinkC

import Style from './style'
import { createCols } from '../utils'
import { FXRandomBetween } from '@liamegan1/fxhash-helpers'

function smoothstep (min, max, value) {
  return Math.max(0, Math.min(1, (value - min) / (max - min)))
}

const palettes = ['https://coolors.co/fdfffc-2ec4b6-ff9f1c-e71d36-011627', 'https://coolors.co/011627-ff9f1c-2ec4b6-e71d36-fdfffc']
export default class Makio64Style extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    const palette = this._p5.random([0, 0, 0, 1])
    this.colors = createCols(palettes[palette])
    this.backgroundColor = this.colors.pop()
    this.defaultColor = this.colors[0]
  }

  beforeDraw () {
    const p5 = this._p5
    p5.background('rgb(0,0,0)')
    p5.fill('#f5f5f5')
    const v = this.projectedPoint(0, this._gridSizeY + 10, 1.5)
    const radius = FXRandomBetween(100, 200)
    p5.circle(v.x, v.y - radius / 5, radius)
    this.drawMountain(1, -200, -this._gridSizeX / 2)
    this.drawMountain(-1, this._gridSizeX / 2, 200)
  }

  drawMountain (factor, min, max) {
    const p5 = this._p5
    const noiseScale = 0.1
    const noiseScale2 = 0.01
    for (let y = 5; y >= 0; y--) {
      p5.strokeWeight(2)
      p5.stroke('#f5f5f5')
      let prev = null
      const paths = []
      for (let x = min; x < max; x++) {
        let noiseVal = p5.noise((x + y * 100) * noiseScale, 0) * 0.5
        noiseVal += p5.noise((x + y * 100) * noiseScale2, y) * 0.15 * (y * 0.4 + 1)

        const x1 = x
        const y1 = this._gridSizeY + y * 15 - 30
        const z1 = ((Math.sin(x * 0.05 + y) + 1) * 0.3 + (0.05 + (y * 0.6 + 1) * noiseVal + y * 0.2)) * smoothstep(10, 50, Math.abs(x))// + smoothstep(min, max, Math.abs(x)) * smoothstep(min, max, Math.abs(x)) * smoothstep(min, max, Math.abs(x)) * 0.5
        const v = this.projectedPoint(x1, y1, z1)
        if (prev) {
          p5.strokeWeight(smoothstep(0, 5, z1) * 3.5)
          // p5.stroke(`rgba(255,255,255,${smoothstep(-1, 6, z1)})`)
          p5.line(prev.x, prev.y, v.x, v.y)
        }
        prev = v
        paths.push(v)
      }
      paths.push(this.projectedPoint(max, this._gridSizeY + y * 20, -50))
      paths.push(this.projectedPoint(min, this._gridSizeY + y * 20, -50))
      // paths.push(p5.createVector(min, 300))
      p5.fill('#000')
      p5.noStroke()
      p5.beginShape()
      for (const p of paths) {
        p5.vertex(p.x, p.y)
      }
      p5.endShape(p5.CLOSE)
    }
  }

  diff (x1, x2) {
    return x2 - x1
  }

  projectedPoint (x = 0, y = 0, z = 0) {
    const [x2d, y2d] = this._projectionCalculator3d.getProjectedPoint([x, y, z]).map(x => x * this._s)
    return this._p5.createVector(x2d, y2d)
  }

  drawTile (tilePoints, p, isBorder) {
    const p5 = this._p5

    const botLeft = this.projectedPoint(p.x, p.y, p.z)
    const topLeft = this.projectedPoint(p.x, p.y + 1, p.z)
    const botRight = this.projectedPoint(p.x + 1, p.y, p.z)
    const topRight = this.projectedPoint(p.x + 1, p.y + 1, p.z)

    const height = 0.015
    const botLeft2 = this.projectedPoint(p.x, p.y, p.z + height)
    const topLeft2 = this.projectedPoint(p.x, p.y + 1, p.z + height)
    const botRight2 = this.projectedPoint(p.x + 1, p.y, p.z + height)
    const topRight2 = this.projectedPoint(p.x + 1, p.y + 1, p.z + height)

    const ratio = (1 - smoothstep(0, 35, p.y))

    // const r = ratio * 5
    // p5.fill('#ff0000')
    // p5.circle(botLeft.x, botLeft.y, r)
    // p5.fill('#ff0000')
    // p5.circle(botRight.x, botRight.y, r)
    // p5.fill('#ff0000')
    // p5.circle(topLeft.x, topLeft.y, r)
    // p5.fill('#ff0000')
    // p5.circle(topRight.x, topRight.y, r)

    // draw floor
    const paddingWidth = ratio * 1 + 0.1
    p5.strokeWeight(paddingWidth)

    p5.strokeWeight(ratio * 1.5 + 0.1)
    p5.stroke('#fff')
    p5.fill('#000')
    this.drawQuad(botLeft, botRight, topRight, topLeft)

    // // draw left
    // this.drawQuad(botLeft2, botLeft, topLeft, topLeft2)
    // // draw right
    // this.drawQuad(botRight2, botRight, topRight, topRight2)
    // // draw front
    // this.drawQuad(botLeft2, botRight2, botRight, botLeft)

    // draw top
    // this.drawQuad(botLeft2, botRight2, topRight2, topLeft2)

    // draw herbs inside
    p5.strokeWeight(0)

    const movementY = 0.1
    const movementX = 0.02
    const z = p.z // + height

    const jizzPower = 0.01

    if (p5.random() > 0.2) {
      for (let x = p.x + 0.02; x < p.x + 1 - 0.02 - movementX; x += movementX) {
        for (let y = p.y + 1; y > p.y + 0.01; y -= movementY) {
          if (p5.random() < 0.5) {
            continue
          }
          const jx = (p5.random() - 0.5) * jizzPower
          const jy = (p5.random() - 0.5) * jizzPower
          const p1 = this.projectedPoint(jx + x, jy + y, z)
          const p2 = this.projectedPoint(jx + x + movementX / 2, jy + y, z + FXRandomBetween(0.005, 0.04))
          const p3 = this.projectedPoint(jx + x + movementX, jy + y, z)
          this.drawTriangleGradient(p1, p2, p3, p5.color('#fff'), p5.color('#000'))
        }
      }
    }
  }

  afterDraw () {
    const p5 = this._p5
    p5.stroke(this.colors[0])
    p5.strokeWeight(0.05 * this._s)
    p5.noFill()
    p5.rect(0, 0, this._s, this._s)
  }

  // ---------------------------------------------------------------------------- DRAW UTILS
  drawQuad (p1, p2, p3, p4) {
    this.drawQuad2(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  }

  drawQuad2 (x1, y1, x2, y2, x3, y3, x4, y4) {
    const p5 = this._p5
    p5.beginShape(p5.QUADS)
    p5.vertex(x1, y1)
    p5.vertex(x2, y2)
    p5.vertex(x3, y3)
    p5.vertex(x4, y4)
    p5.endShape()
  }

  drawTriangleGradient (p1, p2, p3, c1, c2) {
    const p5 = this._p5
    p5.drawingContext.save()
    const gradient = p5.drawingContext.createLinearGradient(p1.x, p2.y, p1.x, p1.y)
    gradient.addColorStop(0, 'rgba(255,255,255,.9)')
    gradient.addColorStop(0.8, 'rgba(0,0,0,.5)')
    p5.drawingContext.fillStyle = gradient
    p5.beginShape(p5.TRIANGLES)
    p5.vertex(p1.x, p1.y)
    p5.vertex(p2.x, p2.y)
    p5.vertex(p3.x, p3.y)
    p5.endShape(p5.CLOSE)
    p5.drawingContext.restore()
  }

  static author () { return 'Makio64' }

  static name () { return 'Nara' }
}
