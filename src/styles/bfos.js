// bfos
// Status: Ready...ish
// Fxhash: https://www.fxhash.xyz/u/bfos
// Wallet: tz1cbJ2fHK4Tv7yES7Tq9dc9k8gXArnk7DyE

import Style from './style'

export default class bfosStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.colors = ["#6a0136", "#618b25", "#aa767c", "#026c7c"];
    this.bgColor = "#000000"
  }

  beforeDraw () {  

    this.colorCount = this._p5.int(this._p5.random(2,4.99))
    this._p5.shuffle(this.colors, true)
    this.brickColors = this._p5.subset(this.colors,0,(this.colorCount))
    
    this._p5.background(this.bgColor)
    
    let backColor = this._p5.color("#333333")
    this._p5.stroke(backColor)
    this._p5.fill(backColor)
    for (let iy=0; iy < this._s; iy+=4){
      for (let ix=0; ix < this._s;ix+=4) {
        this._p5.point(ix,iy)
      }
    }
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {

    let brickColorIndex
    let brickColor;
    
    brickColorIndex = this._p5.round(this._p5.map(frontLeftCorner3DCoord.y, 0, this._gridSizeY, 0, this.brickColors.length-1))
    brickColor = this._p5.color(this.brickColors[brickColorIndex]);

    this._p5.stroke(brickColor)
    this._p5.fill(brickColor)
    this._p5.strokeWeight(1)

    switch(brickColorIndex){
      case 0:
        brickColor.setAlpha(150)
        this._p5.stroke(brickColor)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.01)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.85,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.25,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.85, this._s * 0.25,2.5)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.01)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.15,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.25,ix) + this._p5.random(0,1));
        }
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.01)) {
          this._p5.point(this._p5.lerp(tilePoints[3].x * this._s,this._s * 0.85,ix),this._p5.lerp(tilePoints[3].y * this._s,this._s * 0.25,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.85, this._s * 0.25,2.5)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.01)) {
          this._p5.point(this._p5.lerp(tilePoints[3].x * this._s,this._s * 0.15,ix),this._p5.lerp(tilePoints[3].y * this._s,this._s * 0.25,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.15, this._s * 0.25,2.5)
        break;
      case 1:
        brickColor.setAlpha(125)
        this._p5.stroke(brickColor)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.02)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.25,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.10,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.25, this._s * 0.10,2)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.02)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.75,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.10,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.75, this._s * 0.10,2)
        break;
        
      case 2:
        brickColor.setAlpha(115)
        this._p5.stroke(brickColor)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.03)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.45,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.12,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.45, this._s * 0.12,1.5)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.03)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.55,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.12,ix) + this._p5.random(0,1));
        }
        this._p5.ellipse(this._s * 0.55, this._s * 0.12,1.5)
        break;
      case 3:
        brickColor.setAlpha(100)
        this._p5.stroke(brickColor)
        for(let ix = 0; ix<=1; ix+=this._p5.random(0.03)) {
          this._p5.point(this._p5.lerp(tilePoints[0].x * this._s,this._s * 0.50,ix),this._p5.lerp(tilePoints[0].y * this._s,this._s * 0.08,ix) + this._p5.random(0,1));
        }
        break;
      }

    brickColor.setAlpha(180)
    this._p5.stroke(brickColor)
    
    let yPositionofY, xStartPositionBasedOnY, xEndPositionBasedOnY;

    for(let iy = tilePoints[0].y * this._s, topY = tilePoints[1].y * this._s; iy > topY; iy-=this._p5.random(1,2)) {
      yPositionofY = 1 - ((iy - topY)  / (tilePoints[0].y * this._s - topY))
      xStartPositionBasedOnY = this._p5.lerp(tilePoints[0].x * this._s, tilePoints[1].x * this._s, yPositionofY)
      xEndPositionBasedOnY = this._p5.lerp(tilePoints[3].x * this._s, tilePoints[2].x * this._s, yPositionofY)
      for(let ix = xStartPositionBasedOnY + this._p5.random(0,2); ix <= xEndPositionBasedOnY; ix+=this._p5.random(1,2)) {
        this._p5.point(ix,iy + this._p5.random(-2,2))
      }
    }
  }

  afterDraw () {}

  static author () { return 'bfos' }

  static name () { return 'In the Lights' }
}
