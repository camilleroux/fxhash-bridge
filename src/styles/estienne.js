// Estienne
// Status: WIP // "WIP", "Ready"
// wallet: tz1fFaDrCytWQiycjWSAfJkyLgQcMMmFEi2y

import { FXRandomIntBetween, FXRandomOption } from "@liamegan1/fxhash-helpers"
import { random } from "chroma-js"
import p5 from "p5"
import Style from "./style"

const palettes = []

export default class EstienneStyle extends Style {
  beforeDraw() {
    const p5 = this._p5
    p5.strokeJoin(p5.ROUND)
    this.palettes = [
      // Cream on blue
      ["#f2e9e4", "#22223b", "#d62828"],
      // White and red on dark gray
      ["#fdf0d5", "#003049", "#780000"],
    ]

    this.palette = p5.random(this.palettes)

    this.bgColor = this.palette.shift()
    this.strokeTileColor = this.palette.shift()
    this.strokeBorderColor = this.palette.shift()
    p5.background(this.bgColor)
    this.bridgeStyle = p5.floor(p5.random(2))
    this.pylonsHeight = 1.1
    this.colorVar = 30

    p5.push()
    p5.stroke(this.strokeTileColor)
    p5.fill(this.bgColor)
    this.bgCity()
    p5.pop()
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    const p5 = this._p5
    const coord = frontLeftCorner3DCoord
    const quads = []
    const duplicates = p5.floor(p5.random(5, 12))
    this.strokeW =
      0.05 + ((1 - (coord.y / this._gridSizeY) ** 0.5) * this._s) / 800

    p5.push()

    p5.stroke(this.strokeTileColor)
    p5.fill(this.bgColor)
    p5.strokeWeight(this.strokeW)

    if (isBorder) {
      p5.stroke(this.strokeBorderColor)
    }

    for (let i = 0; i <= duplicates; i++) {
      let quadPoints = []
      ;[
        [coord.x, coord.y],
        [coord.x + 1, coord.y],
        [coord.x + 1, coord.y + 1],
        [coord.x, coord.y + 1],
      ].forEach((p) => {
        const v = p5.createVector(
          ...this._projectionCalculator3d.getProjectedPoint([
            p[0],
            p[1],
            p5.map(i, 0, duplicates - 1, coord.z - 0.01 * duplicates, coord.z),
          ])
        )
        quadPoints.push(v)
      }, this)
      quadPoints[4] = 255 * (i / duplicates) ** 2
      quads.push(quadPoints)
    }

    for (let q of quads) {
      p5.push()
      let c = p5.color(isBorder ? this.strokeBorderColor : this.strokeTileColor)
      c.setAlpha(q[4])
      p5.stroke(c)
      let bg = p5.color(this.bgColor)
      bg.setAlpha(q[4])
      p5.fill(bg)
      this.quad(
        q[0].x * this._s,
        q[0].y * this._s,
        q[1].x * this._s,
        q[1].y * this._s,
        q[2].x * this._s,
        q[2].y * this._s,
        q[3].x * this._s,
        q[3].y * this._s
      )
      p5.pop()
    }

    if (isBorder) {
      switch (this.bridgeStyle) {
        case 0:
          this.suspendedBridge(coord)
          break

        case 1:
          this.cableStayedBridge(coord)
          break
      }
    }

    p5.pop()
  }

  suspendedBridge(coord) {
    const p5 = this._p5

    // Draw main cables in 2 parts (before and after pylons)
    if (!this.mainCablesDrawn1) {
      p5.push()
      for (let gy = this._gridSizeY; gy > this._gridSizeY / 2; gy--) {
        const y = 1 - gy / this._gridSizeY
        const y1 = 1 - (gy - 1) / this._gridSizeY
        const h0 = 0.2
        const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
        const h1 = h0 + p5.min(y1 ** 2, (y1 - 1) ** 2) * 4 * (1 - h0)
        p5.strokeWeight(4 * this.strokeW)
        this.line3D(
          -this._gridSizeX / 2 + 0.5,
          gy + 0.5,
          h,
          -this._gridSizeX / 2 + 0.5,
          gy - 0.5,
          h1
        )
        this.line3D(
          this._gridSizeX / 2 - 0.5,
          gy + 0.5,
          h,
          this._gridSizeX / 2 - 0.5,
          gy - 0.5,
          h1
        )
      }
      this.mainCablesDrawn1 = true
      p5.pop()
    }
    if (!this.mainCablesDrawn2 && this.pylonsDrawn) {
      p5.push()
      for (let gy = this._gridSizeY / 2; gy > -1; gy--) {
        const y = 1 - gy / this._gridSizeY
        const y1 = 1 - (gy - 1) / this._gridSizeY
        const h0 = 0.2
        const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
        const h1 = h0 + p5.min(y1 ** 2, (y1 - 1) ** 2) * 4 * (1 - h0)
        p5.strokeWeight(4 * this.strokeW)
        this.line3D(
          -this._gridSizeX / 2 + 0.5,
          gy + 0.5,
          h,
          -this._gridSizeX / 2 + 0.5,
          gy - 0.5,
          h1
        )
        this.line3D(
          this._gridSizeX / 2 - 0.5,
          gy + 0.5,
          h,
          this._gridSizeX / 2 - 0.5,
          gy - 0.5,
          h1
        )
      }
      this.mainCablesDrawn2 = true
      p5.pop()
    }

    // Draw secondary cables
    if (coord.x == -this._gridSizeX / 2 || coord.x == this._gridSizeX / 2 - 1) {
      const y = 1 - (coord.y - 0.5) / this._gridSizeY
      const h0 = 0.2
      const h = h0 + p5.min(y ** 2, (y - 1) ** 2) * 4 * (1 - h0)
      this.line3D(
        coord.x + 0.5,
        coord.y + 0.5,
        coord.z,
        coord.x + 0.5,
        coord.y + 0.5,
        h
      )
    }

    this.pylons(coord)
  }

  cableStayedBridge(coord) {
    const p5 = this._p5
    // Draw railings and cables
    if (
      !(coord.y % 2) &&
      (coord.x == -this._gridSizeX / 2 || coord.x == this._gridSizeX / 2 - 1)
    ) {
      const railHeight = 0.1
      const railWidth = 0.02
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y + 0.4,
        coord.z,
        coord.x + 0.75,
        coord.y + 0.6,
        coord.z + railHeight
      )
      this.boxFromCorners(
        coord.x + 0.25,
        coord.y - 0.5,
        coord.z + railHeight,
        coord.x + 0.75,
        coord.y + 1.5,
        coord.z + railHeight + railWidth
      )
      // cables
      this.line3D(
        coord.x + 0.5,
        coord.y + 0.5,
        coord.z + railHeight + railWidth,
        coord.x + 0.5,
        this._gridSizeY / 2,
        coord.z + this.pylonsHeight - 0.1
      )
    }

    this.pylons(coord)
  }

  // Draw pylons
  pylons(coord) {
    const p5 = this._p5
    if (
      window.$fxhashFeatures.borders != "none" &&
      coord.y / this._gridSizeY < 0.5 &&
      !this.pylonsDrawn
    ) {
      p5.push()
      p5.strokeWeight(2 * this.strokeW)
      p5.stroke(this.strokeBorderColor)
      this.boxFromCorners(
        -this._gridSizeX / 2,
        this._gridSizeY / 2,
        -0.2,
        -this._gridSizeX / 2 + 1,
        this._gridSizeY / 2 + 1,
        this.pylonsHeight
      )
      this.boxFromCorners(
        this._gridSizeX / 2 - 1,
        this._gridSizeY / 2,
        -0.2,
        this._gridSizeX / 2,
        this._gridSizeY / 2 + 1,
        this.pylonsHeight
      )
      this.pylonsDrawn = true
      p5.pop()
    }
  }

  bgCity() {
    // Draw water
    this._p5.push()
    let c = this._p5.color(this.strokeTileColor)
    c.setAlpha(50)
    this._p5.stroke(c)
    for (let y = this._gridSizeY; y >= 0; y -= 0.5) {
      this.strokeW = this._p5.map(y, 0, this._gridSizeY, 2, 0.05, true)
      this._p5.strokeWeight(this.strokeW)
      this.line3D(
        this._p5.random(-6 * this._gridSizeX, 6 * this._gridSizeX),
        y,
        -0.2,
        this._p5.random(-6 * this._gridSizeX, 6 * this._gridSizeX),
        y,
        -0.2
      )
    }
    this._p5.pop()

    // Draw sun
    this._p5.push()
    this._p5.stroke(this.strokeBorderColor)
    this.strokeW = (0.5 * this._s) / 800
    this._p5.strokeWeight(this.strokeW)
    let x = this._p5.random(-this._gridSizeX * 4, this._gridSizeX * 4)
    this.xzCircle(x, this._gridSizeY, 2.5, 20, 32)
    this._p5.pop();

    // Draw Buildings
    this.strokeW = (0.3 * this._s) / 800
    this._p5.strokeWeight(this.strokeW)
    this.boxFromCorners(
      -this._gridSizeX * 6.2,
      this._gridSizeY * 3,
      -0.2,
      this._gridSizeX * 6.2,
      0.9 * this._gridSizeY,
      0
    )
    for (let y = this._gridSizeY * 3; y > this._gridSizeY; y -= 0.1) {
      this.strokeW = this._p5.map(
        y,
        this._gridSizeY * 3,
        this._gridSizeY,
        0.05,
        0.2
      )
      this._p5.strokeWeight(this.strokeW)
      let s = this._p5.random(1, 4)
      let x1 =
        this._p5.random([-1, 1]) *
          this._p5.random(this._gridSizeX / 2, this._gridSizeX * 6) -
        s / 2
      let y1 = y
      let z1 = 0
      let x2 = x1 + s
      let y2 = y1 + s
      let z2 = 1 + this._p5.random() ** 3 * 2
      this.boxFromCorners(x1, y1, z1, x2, y2, z2)
    }
  }

  // Draw a circle in the XZ plane
  xzCircle(x, y, z, diam, steps = 32) {
    const aOffset = this._p5.random(this._p5.TWO_PI)
    for (let i = 0; i <= steps; i++) {
      const a0 = (i * this._p5.TWO_PI) / steps + aOffset
      const a1 = ((i + 1) * this._p5.TWO_PI) / steps + aOffset
      const x0 = x + 0.5 * diam * this._p5.cos(a0)
      const z0 = z + (0.5 * diam * this._p5.sin(a0)) / this._gridSizeX
      const x1 = x + 0.5 * diam * this._p5.cos(a1)
      const z1 = z + (0.5 * diam * this._p5.sin(a1)) / this._gridSizeX
      this.line3D(x0, y, z0, x1, y, z1)
    }
  }

  // Draw a random line
  line_random(...args) {
    let d = this.strokeW * 5
    let l = 4
    this._p5.push()
    let c = this._p5.color(this._p5.drawingContext.strokeStyle)
    c.levels = c.levels.map(
      (x) => x + this._p5.random(-this.colorVar, this.colorVar)
    )
    this._p5.stroke(c.levels[0], c.levels[1], c.levels[2], c.levels[3] / l)
    for (let i = 0; i < l; i++) {
      args = args.map((x) => x + this._p5.random(-d, d))
      this._p5.line(...args)
    }
    this._p5.pop()
  }

  // Draw a noise line
  line(x1, y1, x2, y2) {
    let d = (15 * this._s) / 800 //this.strokeW * 30
    let l = 4
    this._p5.push()
    let c = this._p5.color(this._p5.drawingContext.strokeStyle)
    c.levels = c.levels.map(
      (x) => x + this._p5.random(-this.colorVar, this.colorVar)
    )
    this._p5.stroke(
      c.levels[0],
      c.levels[1],
      c.levels[2],
      c.levels[3] / (0.5 * l)
    )
    for (let i = 0; i < l; i++) {
      let rx1 = x1 + d * (this._p5.noise(x1, y1 + x1, 4.71 * i) - 0.5)
      let ry1 = y1 + d * (this._p5.noise(y1, y1 + x1, 4.71 * i) - 0.5)
      let rx2 = x2 + d * (this._p5.noise(x2, x2 + y2, 4.71 * i) - 0.5)
      let ry2 = y2 + d * (this._p5.noise(y2, x2 + y2, 4.71 * i) - 0.5)
      this._p5.line(rx1, ry1, rx2, ry2)
    }
    this._p5.pop()
  }

  // Draw a dotted line
  line_dotted(x1, y1, x2, y2) {
    this._p5.rectMode(this._p5.CENTER)
    let d = this._p5.drawingContext.lineWidth * 2
    let l = (1600 * this._p5.dist(x1, y1, x2, y2)) / this._s
    this._p5.push()
    let c = this._p5.color(this._p5.drawingContext.strokeStyle)
    c.levels = c.levels.map(
      (x) => x + this._p5.random(-this.colorVar, this.colorVar)
    )
    this._p5.noStroke()
    this._p5.fill(c.levels[0], c.levels[1], c.levels[2], c.levels[3] / 2)
    for (let i = 0; i < 1; i += 1 / l) {
      if (this._p5.random() < 0.5)
        this._p5.circle(
          this._p5.lerp(x1, x2, i),
          this._p5.lerp(y1, y2, i),
          this._p5.random(d / 2, d * 2)
        )
    }
    this._p5.pop()
  }

  // Draw a quad using the custom line method
  quad(x1, y1, x2, y2, x3, y3, x4, y4) {
    this._p5.push()
    this._p5.noStroke()
    this._p5.quad(x1, y1, x2, y2, x3, y3, x4, y4)
    this._p5.pop()
    this._p5.push()
    this._p5.noFill()
    this.line(x1, y1, x2, y2)
    this.line(x2, y2, x3, y3)
    this.line(x3, y3, x4, y4)
    this.line(x4, y4, x1, y1)
    this._p5.pop()
  }

  // Draw a projected 3D line
  line3D(x1, y1, z1, x2, y2, z2) {
    this.line(
      ...this._projectionCalculator3d
        .getProjectedPoint([x1, y1, z1])
        .map((x) => x * this._s),
      ...this._projectionCalculator3d
        .getProjectedPoint([x2, y2, z2])
        .map((x) => x * this._s)
    )
  }

  // Draw a 3D box without rotation from 2 corner points
  boxFromCorners(x1, y1, z1, x2, y2, z2) {
    const quadList = [
      [
        [x1, y1, z1],
        [x1, y2, z1],
        [x2, y2, z1],
        [x2, y1, z1],
      ],
      [
        [x1, y1, z2],
        [x1, y2, z2],
        [x2, y2, z2],
        [x2, y1, z2],
      ],
      [
        [x1, y1, z1],
        [x1, y2, z1],
        [x1, y2, z2],
        [x1, y1, z2],
      ],
      [
        [x2, y1, z1],
        [x2, y2, z1],
        [x2, y2, z2],
        [x2, y1, z2],
      ],
      [
        [x1, y1, z1],
        [x2, y1, z1],
        [x2, y1, z2],
        [x1, y1, z2],
      ],
      [
        [x1, y2, z1],
        [x2, y2, z1],
        [x2, y2, z2],
        [x1, y2, z2],
      ],
    ]

    quadList.sort(
      (a, b) =>
        this._p5.dist(
          (b[0][0] + b[1][0] + b[2][0] + b[3][0]) / 4,
          (b[0][1] + b[1][1] + b[2][1] + b[3][1]) / 4,
          (b[0][2] + b[1][2] + b[2][2] + b[3][2]) / 4,
          0,
          0,
          0.5
        ) -
        this._p5.dist(
          (a[0][0] + a[1][0] + a[2][0] + a[3][0]) / 4,
          (a[0][1] + a[1][1] + a[2][1] + a[3][1]) / 4,
          (a[0][2] + a[1][2] + a[2][2] + a[3][2]) / 4,
          0,
          0,
          0.5
        )
    )

    const pointList = quadList.map((pl) =>
      pl.map((p) =>
        this._projectionCalculator3d.getProjectedPoint([p[0], p[1], p[2]])
      )
    )

    for (let p of pointList) {
      this.quad(
        p[0][0] * this._s,
        p[0][1] * this._s,
        p[1][0] * this._s,
        p[1][1] * this._s,
        p[2][0] * this._s,
        p[2][1] * this._s,
        p[3][0] * this._s,
        p[3][1] * this._s
      )
    }
  }

  afterDraw() {}

  static author() {
    return "Estienne"
  }

  static name() {
    return "Estienne Style"
  }
}
