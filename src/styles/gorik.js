// Gorik Francois
// Status: WIP // "WIP", "Ready"
// Twitter: @gorikfr
// Fxhash: https://www.fxhash.xyz/u/Gorik
// Wallet: tz1Zjhf1JkXsjRhaxemA5CxXfsU6G9624nHR

/*
 The code for GorikStyle is Copyright (C) 2022 by Gorik Francois.

 I grant Camille Roux a permanent, irrevocable, non-exclusive,
 license to release this code as part of the BRIDGE project under
 the licensing terms of the entire project.

 For all other uses, the code for GorikStyle is released under
 CC-BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import Style from './style'
import { FXRandomBetween, FXRandomIntBetween, FXRandomOption } from '@liamegan1/fxhash-helpers'

export default class GorikStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    const colorMap = this.getColorMap()
    const keys = Array.from(colorMap.keys())
    this.randomColor = FXRandomOption(keys)
    this.randomArray = colorMap.get(this.randomColor)
  }

  beforeDraw () {
    this.bg()
    this.drawBgPoly(this._s / 4, this._s / 4, this._s / 4)
    this.drawBgPoly((this._s / 4) * 3, this._s / 4, this._s / 4)
  }

  bg () {
    const cc = this.getRandomColour(this.randomArray)
    const cc2 = this.getRandomColour(this.randomArray)
    this._p5.push()

    this._p5.background(this.addAlpha(cc, 100))
    this._p5.fill(cc2)

    for (let i = 0; i < this._p5.height; i += 3) {
      for (let j = 0; j < this._p5.width; j += 3) {
        this._p5.rect(i, j, 2)
      }
    }
    this._p5.noStroke()
    this.drawMist(this.createShapes(300))
    this.drawMist(this.createShapes(150))
    this.drawMist(this.createShapes(0))
    this._p5.pop()
  }

  createShapes (f) {
    const offset = this._p5.random(-400, 400)
    const stretchedPentagon = [
      this._p5.createVector(this._p5.width * 0.85 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.5 + offset),
      this._p5.createVector(this._p5.width * 0.75 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.75 + offset),
      this._p5.createVector(this._p5.width * 0.5 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.85 + offset),
      this._p5.createVector(this._p5.width * 0.4 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.75 + offset),
      this._p5.createVector(this._p5.width * 0.3 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.5 + offset),
      this._p5.createVector(this._p5.width * 0.4 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.25 + offset),
      this._p5.createVector(this._p5.width * 0.5 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.1 + offset),
      this._p5.createVector(this._p5.width * 0.75 + this._p5.randomGaussian(0, f) + offset, this._p5.width * 0.25 + offset)
    ]
    return stretchedPentagon
  }

  drawMist (arr) {
    for (let j = 0; j < 80; j += 1) {
      const shape = this.polygon(arr, 1)
      this._p5.fill(this.addAlpha(this.getRandomColour(this.randomArray), 5))
      this._p5.beginShape()
      for (const i of shape) {
        this._p5.vertex(i.x, i.y)
      }
      this._p5.endShape(this._p5.CLOSE)
    }
  }

  polygon (shape, depth) {
    if (depth >= 7) {
      return shape
    } else {
      const nextShape = []
      for (const i in shape) {
        nextShape.push(shape[i])
        let next = this._p5.int(i) + 1
        if (next > shape.length - 1) next = 0
        const middle = this._p5.createVector((shape[next].x + shape[i].x) / 2
          , (shape[next].y + shape[i].y) / 2)
        const dx = this._p5.randomGaussian(0, 100)
        const dy = this._p5.randomGaussian(0, 100)
        middle.add(dx, dy)
        nextShape.push(middle)
      }
      return this.polygon(nextShape, depth + 1)
    }
  }

  drawBgPoly (cx, cy, w) {
    this._p5.push()
    this._p5.translate(cx - w / 2, cy - w / 2)
    for (let i = 3; i < FXRandomIntBetween(8, 15); i++) {
      this.drawRandomPoly(i, w)
    }
    this._p5.pop()
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    const w = this._p5.dist(tilePoints[0].x, tilePoints[0].y, tilePoints[1].x, tilePoints[1].y) * this._s
    const delta = tilePoints[1].x - tilePoints[0].x
    if (isBorder) {
      for (let x = tilePoints[0].x * this._s; x < tilePoints[3].x * this._s; x += w / 20) {
        this.line15(x, tilePoints[0].y * this._s, x + delta * this._s, tilePoints[1].y * this._s, 50)
      }
    } else {
      for (let x = tilePoints[0].x * this._s; x < tilePoints[3].x * this._s; x += w / 15) {
        this.tLine(x, tilePoints[0].y * this._s, x + delta * this._s, tilePoints[1].y * this._s)
      }
    }
  }

  drawRandomPoly (n, w) {
    let points = []
    for (let i = 0; i < n; i++) {
      points.push({
        x: FXRandomIntBetween(0, w),
        y: FXRandomIntBetween(0, w)
      })
    }

    for (let i = 0; i < n; i++) {
      this.drawPolygon(points)
      points = this.getNextPoints(points, 0.05)
    }
  }

  drawPolygon (points) {
    this._p5.fill(this.addAlpha(this.getRandomColour(this.randomArray), 150))
    this._p5.beginShape()
    for (const point of points) {
      this._p5.vertex(point.x, point.y)
    }
    this._p5.endShape()
  }

  getNextPoints (points, percentage) {
    const nextPoints = []
    for (let i = 0; i < points.length; i++) {
      const pointA = points[i]
      const pointB = points[(i + 1) % points.length]

      const diffX = pointB.x - pointA.x
      const diffY = pointB.y - pointA.y

      const nextX = pointA.x + percentage * diffX
      const nextY = pointA.y + percentage * diffY

      nextPoints.push({
        x: nextX,
        y: nextY
      }
      )
    }

    return nextPoints
  }

  tLine (x1, y1, x2, y2) {
    this._p5.strokeWeight(5)
    this._p5.noFill()
    this._p5.stroke(this.addAlpha(this.getRandomColour(this.randomArray), 150))
    this._p5.line(x1, y1, x2, y2)
  }

  line15 (x1, y1, x2, y2, weight) {
    const points = []
    this._p5.strokeWeight(0.5)

    this._p5.fill(this.addAlpha(this.getRandomColour(this.randomArray), 150))
    this._p5.noStroke()
    points.push({
      x: x1,
      y: y1
    })
    points.push({
      x: x2,
      y: y2
    })
    for (let k = 0; k < 1; k++) {
      this._p5.beginShape()
      this._p5.noStroke()
      this._p5.fill(this.addAlpha(this.getRandomColour(this.randomArray), 150))
      this._p5.vertex(x1, y1)
      for (let lval = 0; lval < 1; lval += 0.001) {
        const px = this._p5.lerp(x1, x2, lval)
        const py = this._p5.lerp(y1, y2, lval)
        const p1 = this._p5.createVector(px, py)
        const l = this._p5.createVector(y2 - y1, x1 - x2)
        const pf = p1.add(l.normalize().mult(FXRandomBetween(-weight / 2, weight / 2)))
        this._p5.vertex(pf.x, pf.y)
      }
      this._p5.vertex(x2, y2)
      this._p5.endShape(this._p5.CLOSE)
    }
  }

  afterDraw () {
  }

  static author () {
    return 'Gorik'
  }

  static name () {
    return 'Mozaik'
  }

  getColorMap () {
    const colorMap = new Map()

    colorMap.set('Gold', ['#F90716', '#FF5403', '#FFCA03', '#FFF323'])
    colorMap.set('Gold2', ['#781D42', '#A3423C', '#DE834D', '#F0D290'])
    colorMap.set('Neon', ['#FBF46D', '#B4FE98', '#77E4D4', '#998CEB'])
    colorMap.set('Neon3', ['#F1F1F1', '#FDB827', '#21209C', '#23120B'])
    colorMap.set('Space', ['#161853', '#292C6D', '#FAEDF0', '#EC255A'])
    colorMap.set('Space2', ['#370665', '#35589A', '#F14A16', '#FC9918'])
    colorMap.set('Vintage', ['#D06224', '#AE431E', '#8A8635', '#E9C891'])
    colorMap.set('Vintage2', ['#97BFB4', '#F5EEDC', '#DD4A48', '#4F091D'])
    colorMap.set('Winter2', ['#766161', '#87A7B3', '#CDC7BE', '#E1F1DD'])
    colorMap.set('Winter', ['#22577E', '#5584AC', '#95D1CC', '#F6F2D4'])
    colorMap.set('Pastel', ['#FF87CA', '#FFC4E1', '#EAEAEA', '#EED7CE'])
    colorMap.set('PastelB', ['#8E806A', '#C3B091', '#E4CDA7', '#FFE6BC'])
    colorMap.set('PastelC', ['#CDF0EA', '#F9F9F9', '#F6C6EA', '#C490E4'])
    colorMap.set('Warm', ['#F5C6A5', '#FF7777', '#A2416B', '#852747'])
    colorMap.set('Cold', ['#009DAE', '#71DFE7', '#C2FFF9', '#FFE652'])
    colorMap.set('Dark', ['#041C32', '#04293A', '#064663', '#ECB365'])
    colorMap.set('Summer', ['#125C13', '#3E7C17', '#F4A442', '#E8E1D9'])
    colorMap.set('Nature', ['#483434', '#6B4F4F', '#EED6C4', '#FFF3E4'])
    colorMap.set('Nature2', ['#C5D7BD', '#9FB8AD', '#383E56', '#FB743E'])
    colorMap.set('Night', ['#000000', '#150050', '#3F0071', '#610094'])
    colorMap.set('Skin', ['#D77FA1', '#BAABDA', '#D6E5FA', '#FFF9F9'])
    colorMap.set('Skin2', ['#9D5C0D', '#E5890A', '#F7D08A', '#FAFAFA'])
    colorMap.set('Skin3', ['#402218', '#865439', '#C68B59', '#D7B19D'])
    return colorMap
  }

  getRandomColour (randomArray) {
    return FXRandomOption(randomArray)
  }

  addAlpha (c, a) {
    const r = this._p5.red(c)
    const g = this._p5.green(c)
    const b = this._p5.blue(c)
    return this._p5.color(r, g, b, a)
  }
}
