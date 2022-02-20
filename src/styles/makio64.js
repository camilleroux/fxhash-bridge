// David Ronai - Makio64
// Status: WIP
// Twitter: @makio64
// Fxhash: https://www.fxhash.xyz/u/Makio64
// Wallet: tz2Xbx5F7w6f8d5mrf5mCQSBT46veDysinkC

import Style from './style'
import { createCols } from '../utils'
import { FXRandomBetween } from '@liamegan1/fxhash-helpers'
import Delaunator from 'delaunator'
import classifyPoint from 'robust-point-in-polygon'

function smoothstep (min, max, value) {
  return Math.max(0, Math.min(1, (value - min) / (max - min)))
}

export default class Makio64Style extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.bgColor = '#000' // '#1c171d'
  }

  beforeDraw () {
    const p5 = this._p5
    p5.background(this.bgColor)
    p5.fill('#f5f5f5')
    const v = this.projectedPoint(0, this._gridSizeY + 10, 1.5)
    const radius = FXRandomBetween(0.1, 0.2) * this._s
    p5.circle(v.x, v.y - radius / 5, radius)
    for (let y = 5; y >= 1; y--) {
      this.drawMountain(y, -200, -this._gridSizeX / 2)
      this.drawMountain(y, this._gridSizeX / 2, 200)
    }
  }

  drawMountain (y, min, max) {
    const p5 = this._p5
    const noiseScale = 0.1
    const noiseScale2 = 0.01
    p5.strokeWeight(2)
    p5.stroke('#f5f5f5')
    let prev = null
    const paths = []
    let maxY = -100000
    let stroke = 1000
    for (let x = min; x < max; x += 2) {
      let noiseVal = p5.noise((x + y * 100) * noiseScale, 0) * 0.5
      noiseVal += p5.noise((x + y * 100) * noiseScale2, y) * 0.15 * (y * 0.4 + 1)

      const x1 = x
      const y1 = this._gridSizeY + y * 15 - 30
      const z1 = ((Math.sin(x * 0.05 + y) + 1) * 0.3 + (0.05 + (y * 0.6 + 1) * noiseVal + y * 0.2)) * smoothstep(10, 50, Math.abs(x))// + smoothstep(min, max, Math.abs(x)) * smoothstep(min, max, Math.abs(x)) * smoothstep(min, max, Math.abs(x)) * 0.5
      const v = this.projectedPoint(x1, y1, z1)
      if (prev) {
        stroke = smoothstep(0, 5, z1) * 4.5
        p5.strokeWeight(stroke)
        // p5.stroke(`rgba(255,255,255,${smoothstep(-1, 6, z1)})`)
        p5.line(prev.x, prev.y, v.x, v.y)
      }
      prev = v
      maxY = Math.max(maxY, v.y)
      paths.push(v)
    }
    const points = []
    for (let i = 0; i < paths.length; i++) {
      for (let y2 = 0; y2 < 20; y2++) {
        if (paths[i].y + y2 * 30 > maxY) {
          continue
        }
        const jizz = y2 === 0 ? 0 : 10
        points.push([paths[i].x + FXRandomBetween(-1, 1) * jizz, paths[i].y + y2 * 30 + FXRandomBetween(-1, 1) * jizz])
        // y2 += FXRandomBetween(10, 40)
      }
    }

    paths.push(this.projectedPoint(max, this._gridSizeY + y * 10, -3))
    paths.push(this.projectedPoint(min, this._gridSizeY + y * 10, -3))

    const polygon = []
    for (let i = 0; i < paths.length; i++) {
      polygon.push([paths[i].x, paths[i].y])
    }

    // paths.push(p5.createVector(min, 300))
    p5.fill(this.bgColor)
    p5.noStroke()
    p5.beginShape()
    for (const p of paths) {
      p5.vertex(p.x, p.y)
    }
    p5.endShape(p5.CLOSE)

    const delaunay = Delaunator.from(points)
    const triangles = delaunay.triangles
    p5.strokeWeight(1)
    p5.stroke('#f5f5f5')

    // for (const p of points) {
    //   p5.circle(p[0], p[1], 3)
    // }

    function triangleCenter (a, b, c) {
      return [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3]
    }

    for (let k = 0; k < triangles.length; k += 3) {
      const id1 = triangles[k]
      const id2 = triangles[k + 1]
      const id3 = triangles[k + 2]
      const vertex1 = points[id1]
      const vertex2 = points[id2]
      const vertex3 = points[id3]

      const center = triangleCenter(vertex1, vertex2, vertex3)
      if (classifyPoint(polygon, center) === 1) {
        // p5.stroke('#0000ff')
        // p5.circle(center[0], center[1], 5)
        continue
      }

      const alpha = (1 - smoothstep(maxY - 150, maxY - 30, center[1])) * 0.3
      p5.stroke(`rgba(255,255,255,${alpha})`)
      p5.beginShape()
      p5.vertex(vertex1[0], vertex1[1])
      p5.vertex(vertex2[0], vertex2[1])
      p5.vertex(vertex3[0], vertex3[1])
      p5.endShape()

      p5.stroke('rgba(255,255,255,1)')
      p5.circle(vertex1[0], vertex1[1], alpha * 0.015 * this._s)
      p5.circle(vertex2[0], vertex2[1], alpha * 0.015 * this._s)
      p5.circle(vertex3[0], vertex3[1], alpha * 0.015 * this._s)
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

    // const height = 0.015
    // const botLeft2 = this.projectedPoint(p.x, p.y, p.z + height)
    // const topLeft2 = this.projectedPoint(p.x, p.y + 1, p.z + height)
    // const botRight2 = this.projectedPoint(p.x + 1, p.y, p.z + height)
    // const topRight2 = this.projectedPoint(p.x + 1, p.y + 1, p.z + height)

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
    // p5.fill(this.bgColor)
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
    const movementX = 0.03
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
          this.drawTriangleGradient(p1, p2, p3, p5.color(`rgba(255,255,255,${0.05 + ratio * 0.95})`), p5.color(`rgba(0,0,0,${0.05 + ratio * 0.45})`))
        }
      }
    }
  }

  afterDraw () {
    const p5 = this._p5
    this.paperVignette()
    p5.stroke('#fff')
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
    gradient.addColorStop(0, c1)
    gradient.addColorStop(0.8, c2)
    p5.drawingContext.fillStyle = gradient
    p5.beginShape(p5.TRIANGLES)
    p5.vertex(p1.x, p1.y)
    p5.vertex(p2.x, p2.y)
    p5.vertex(p3.x, p3.y)
    p5.endShape(p5.CLOSE)
    p5.drawingContext.restore()
  }

  // add slight vigneting, code based on estienne.js
  paperVignette () {
    const p5 = this._p5
    // Creates a radial gradient fill
    const grad = p5.drawingContext.createRadialGradient(
      this._s / 2,
      this._s / 2,
      0.45 * this._s,
      this._s / 2,
      this._s / 2,
      0.7 * this._s
    )
    const col1 = p5.color(this.bgColor)
    const col2 = p5.color(this.bgColor)
    col1.setAlpha(0)
    // col2.setAlpha(1)
    grad.addColorStop(0, col1)
    grad.addColorStop(0.4, col2)
    p5.drawingContext.fillStyle = grad
    p5.noStroke()
    p5.circle(this._s / 2, this._s / 2, 2 * this._s)
  }

  static author () { return 'Makio64' }

  static name () { return 'Nara' }
}
