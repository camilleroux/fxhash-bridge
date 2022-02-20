// Generative Pen
// Status: Ready // "WIP", "Ready"
// Twitter: @GenerativePen
// Fxhash: https://www.fxhash.xyz/u/Generative%20Pen
// Wallet: tz2VCEGFwmv17wc64AoMJ4qpgprvJA35CvPK

import Style from './style'

export default class GenPenStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.gridSizeY = gridSizeY
    this.changeColor = Math.floor(p5.random(3))
    this.gph = []
    this.ngph = p5.random(3,12)
    this.nbgpts = p5.random(4000,10000)
    this.trans = []
    for(let i = 0; i < this.ngph; i++)
      this.trans.push([this._p5.random(-0.001,0.001)*this._s, this._p5.random(-0.001,0.001)*this._s])
    this.bg
    this.r=0, this.w=0, this.b=0
  }

  beforeDraw () {
    this._p5.background(this._p5.random(0, 10))
    if(this._p5.random()<0.3) this._p5.background(0, this._p5.random(2, 4), 0)
    this._p5.push()

    this.bg = this._p5.createGraphics(this._p5.width, this._p5.height)
    this.bg.push()
    this.bg.strokeWeight(this._s/8000)

    this.bg.noFill()
    this.bg.stroke(205, 50)
    this.bg.beginShape()
    for(let i = 0; i < this.nbgpts; i++){
      this.bg.vertex(this._p5.random()*this.bg.width, this._p5.random()*this.bg.height)
    }
    this.bg.endShape()
    this._p5.image(this.bg, 0, 0)

    for(let i = 0; i < this.ngph; i++){
      this.gph.push(this._p5.createGraphics(this._p5.width, this._p5.height))
      this.gph[i].push()
      this.gph[i].colorMode(this._p5.HSB)
      this.gph[i].stroke(this._p5.random()*360, 70, 100, 0.4)
      // this.gph[i].stroke(255, 100)
      // if(this.r == 0 || this._p5.random() < 0.2) this.gph[i].stroke(0,0,170, 100), this.r = 1
      // else if(this.b == 0 || this._p5.random() < 0.4) this.gph[i].stroke(170,0,0, 100), this.b = 1
      // if(this.w == 0)this.gph[i].stroke(255, 100), this.w = 1
      this.gph[i].strokeWeight(this._p5.map(this.ngph, 3, 12, 6, 2)*this._s/8000)
      this.gph[i].fill(this._p5.random(20, 90), 50)
      this.gph[i].noFill()
      this.gph[i].beginShape()
    }
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    if(isBorder) return

    let randheight = 70+this._p5.random(-30, 50)

    for(let i = 0; i < this.ngph; i++){
      let idx = Math.floor(this._p5.random(0,3))
      this._p5.curveVertex(tilePoints[idx].x * this._s, tilePoints[idx].y * this._s)
      if(this._p5.random() > 0.7){
        let idx2 = (idx + Math.floor(this._p5.random(1,3)))%4
        this._p5.vertex(tilePoints[idx2].x * this._s, tilePoints[idx2].y * this._s)
      }
    }
  }

  afterDraw () {
    for(let i = 0; i < this.ngph; i++){
      this._p5.push()
      this._p5.translate(this.trans[i][0], this.trans[i][1])
      this.gph[i].endShape()
      this.gph[i].pop()
      this._p5.image(this.gph[i], 0, 0)
      this._p5.pop()
    }
    this.bg.pop()
    this._p5.pop()
  }

  static author () { return 'Generative Pen' }

  static name () { return 'PLACEHOLDER' }
}
