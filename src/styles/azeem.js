// Azeem
// Status: Ready
// Twitter: @azeemstweet
// Fxhash: https://www.fxhash.xyz/u/Azeem
// Wallet: tz1UTznHgoLcSAC3F4FsEDDnin88ovXGQ5MW

import Style from './style'

export default class BoilerplateStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.xc=0
    this.yc=0
    this.r=0
    this.mainCol=this._p5.random()*360
    this.altCol=(this.mainCol+180)%360
    this._p5.colorMode(this._p5.HSB)
    this.arr=[]
    this.t=[]

  }
  beforeDraw () {
    this._p5.background(1000)
    this._p5.stroke(this.mainCol,60,100)
    for(let i=0;i<100000;i++)this._p5.point(this._p5.random()*this._s,this._p5.random()*this._s)
    this.temp= this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0])
    this.temp1= this._projectionCalculator3d.getProjectedPoint([this._gridSizeX, 0,0])
    this._p5.noFill()
    let r=0.3
    let a1=[]
    this._p5.angleMode(this._p5.DEGREES)
    for(let i=0;i<10000;i++){
      let tempr=r*this._p5.random()
      let tempt=360*this._p5.random()
      a1.push(0.5+tempr*Math.cos(tempt))
      a1.push(this.temp[1]+tempr*Math.sin(tempt))
    }
    for(let i=0;i<a1.length-7;i+=2){
      this._p5.stroke(0)
      if(this._p5.random()<0.1)this._p5.stroke(this.altCol,50,50)
      this._p5.bezier(a1[i]*this._s,a1[i+1]*this._s,a1[i+2]*this._s,a1[i+3]*this._s,a1[i+4]*this._s,a1[i+5]*this._s,a1[i+6]*this._s,a1[i+7]*this._s)
    }
    this.xc=0.5
    this.yc=this.temp[1]
    this.r=this.temp1[0]
    this._p5.stroke(this.altCol,100,100)

  }
  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    this.arr.push(tilePoints[0].x)
    this.arr.push(tilePoints[0].y)
    this.arr.push(tilePoints[1].x)
    this.arr.push(tilePoints[1].y)
    this.arr.push(tilePoints[2].x)
    this.arr.push(tilePoints[2].y)
    this.arr.push(tilePoints[3].x)
    this.arr.push(tilePoints[3].y)
    if(this._p5.random()<0.1){
      let l=this.t.length
      this.t[l]=[]
      for(let i=0;i<40;i++){
        this.t[l].push(tilePoints[0].x+(tilePoints[3].x-tilePoints[0].x)*this._p5.random())
        this.t[l].push(tilePoints[0].y+(tilePoints[0].y-tilePoints[1].y)*10*this._p5.random())
      }
    }

  }

  afterDraw () {
    this._p5.noFill()
    this._p5.push()
    this._p5.drawingContext.shadowBlur=10
    this._p5.drawingContext.shadowColor=this._p5.color(0)
    for(let i=0;i<this.arr.length-7;i+=2){
      this._p5.stroke(this._p5.map(i,0,this.arr.length-4,60,360),100,100)
      this._p5.bezier(this.arr[i]*this._s,this.arr[i+1]*this._s,this.arr[i+2]*this._s,this.arr[i+3]*this._s,this.arr[i+4]*this._s,this.arr[i+5]*this._s,this.arr[i+6]*this._s,this.arr[i+7]*this._s)
    }
    this._p5.pop()
    for(let tt of this.t){
      for(let i=0;i<tt.length;i+=2){
        this._p5.stroke(this.altCol+30*this._p5.randomGaussian(),80,80)
        this._p5.bezier(tt[i]*this._s,tt[i+1]*this._s,tt[i+2]*this._s,tt[i+3]*this._s,tt[i+4]*this._s,tt[i+5]*this._s,tt[i+6]*this._s,tt[i+7]*this._s)
      }
    }
  }

  static author () { return 'Azeem' }

  static name () { return 'Bezier-walkers' }
}
