// Claus O. Wilke
// Status: WIP // "WIP", "Ready"
// Wallet: tz1XTr7d3FZ19KndZ1HX3iav8fqKeZwGx8bZ

import Style from './style'

export default class WilkeStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.centerx = this._p5.random(0.45, 0.55)
    this.centery = this._p5.random(0.6, 0.4)
    this.radius = this._p5.random(0.2, 0.4)
    console.log("Center x:", this.centerx)
    console.log("Center y:", this.centery)
    console.log("Radius:", this.radius)
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
  
  beforeDraw () {
    this._p5.background('#FEFAF0')
    
    // canvas background stippling
    this._p5.stroke('#F0F0F0')
    this._p5.strokeWeight(.5)
    let n = 400
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = (i + 0.5) / n + this._p5.randomGaussian(0, 0.4/n)
        let y = (j + 0.5) / n + this._p5.randomGaussian(0, 0.4/n)
        this._p5.point(x * this._s, y * this._s)
      }
    }

    
    this._p5.noStroke()
    this._p5.fill('#303030')
    this._p5.strokeWeight(2)
    this._p5.circle(this.centerx * this._s, this.centery * this._s, 2 * this.radius * this._s)

    // halo around center circle
    /*
    this._p5.stroke('#640723')
    this._p5.strokeWeight(1)
    for (let i = 0; i < 400000; i++) {
      let x = this._p5.randomGaussian(this.centerx, 0.4*this.radius)
      let y = this._p5.randomGaussian(this.centery, 0.4*this.radius)
      this.drawPointExterior(x, y)
    }*/
    
    // interior background stippling
    this._p5.stroke('#505050')
    this._p5.strokeWeight(.5)
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
  }

  drawTile (tilePoints, frontLeftCorner3DCoord) {
    // unproject tile points
    // https://github.com/Infl1ght/projection-3d-2d
    let mean = frontLeftCorner3DCoord.copy()
    mean.add(this._p5.createVector(0.5, 0.5, 0))
    
    /*
    this._p5.noStroke()
    this._p5.fill('#E5E3E0')
    this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s, tilePoints[1].x * this._s, tilePoints[1].y * this._s, tilePoints[2].x * this._s, tilePoints[2].y * this._s, tilePoints[3].x * this._s, tilePoints[3].y * this._s)
    */
    
    // y distance in uv coords
    let dy = tilePoints[0].y - tilePoints[2].y
    //console.log(dy)
    let pcol = this._p5.color('#000000')
    let alpha = 255
    if (10*dy < .2) {
      alpha = 1275*10*dy
    }
    pcol.setAlpha(alpha)
    let sw = 2*Math.max(10*dy, .1)
    this._p5.strokeWeight(sw)
    let off = 0.5/this._s
    // number of points along one dimension
    
    let n = Math.sqrt(Math.max(600*(1 - 0.02*frontLeftCorner3DCoord.y), 9))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let x = (i + 0.5)/n + this._p5.randomGaussian(0, 0.2/n) - .5
        let y = (j + 0.5)/n + this._p5.randomGaussian(0, 0.2/n) - .5
        let p = this._projectionCalculator3d.getProjectedPoint([x + mean.x, y + mean.y, mean.z])
        this._p5.stroke("#FFFFFF")
        this.drawPointHalfClip(p[0] + off, p[1] + off)
        this._p5.stroke(pcol)
        this.drawPointHalfClip(p[0], p[1])
      }
    }
      
      /*
  
    for (let i = 0; i < 300*(1 - 0.02*frontLeftCorner3DCoord.y); i++) {
      let x = this._p5.randomGaussian(0, .3)
      let y = this._p5.randomGaussian(0, .3)
      if (x > -.5 && x < .5 && y > -.5 && y < .5) {
        let p = this._projectionCalculator3d.getProjectedPoint([x + mean.x, y + mean.y, mean.z])
        this._p5.stroke("#FFFFFF")
        this.drawPointHalfClip(p[0] + off, p[1] + off)
        this._p5.stroke(pcol)
        this.drawPointHalfClip(p[0], p[1])
      }
    } */
  }

  afterDraw () {
    /*
    this._p5.stroke('#0203F0')
    this._p5.strokeWeight(2)
    for (let i = 0; i < 5000; i++) {
      let x = this._p5.randomGaussian(.5, .2) * this._s 
      let y = this._p5.randomGaussian(.5, .2) * this._s
      this._p5.point(x, y)
    }
    this._p5.circle(this.x * this._s, this.y * this._s, this.radius * this.s_)
    this._p5.circle(.2 * this._s, .2 * this._s, .4 * this.s_)
    */
  }

  static author () { return 'Claus O. Wilke' }

  static name () { return 'Wilke' }
}
