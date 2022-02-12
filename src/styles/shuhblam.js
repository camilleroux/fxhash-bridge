// Cole Gillespie
// Status: WIP // "WIP", "Ready"
// Wallet: tz.....

import Style from './style'

export default class ShuhblamStyle extends Style {
  addGrain(amount){
    this._p5.loadPixels()
  
    for(let i=0;i<(this._s*this._p5.pixelDensity())*(this._s*this._p5.pixelDensity())*4;i+=4){
      let noise = this._p5.map(this._p5.random(),0,1,-amount,amount)
      this._p5.pixels[i] = this._p5.pixels[i]+noise
      this._p5.pixels[i+1] = this._p5.pixels[i+1]+noise
      this._p5.pixels[i+2] = this._p5.pixels[i+2]+noise
      this._p5.pixels[i+3] = this._p5.pixels[i+3]+noise
    }
  
    this._p5.updatePixels()
  }
  
  beforeDraw () {
    console.log(this._s);
    this.center = this._s / 2;
    this.halfCenter = this.center / 2;
    this._p5.background('#040585');
    this._p5.background('#F1F1F1');
    this.p4 = this._p5.random(1,5);
    this.p4m = this._p5.random(2,8);
    this.p4s = this._p5.random(5,10);
    this.sw = this._p5.random(1);

    this.lines = this._p5.random(10,20)

    this._p5.strokeWeight(this._p5.random(.5,.7));
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    //console.log(frontLeftCorner3DCoord, isBorder)
    if(isBorder){
      

      this._p5.stroke('#000000');
      //this._p5.strokeWeight(this._p5.random(.1,.5));
      this.p4 = this.p4s;
    } else {

      this.p4 = this.p4m
      this._p5.stroke(this._p5.random(['#046586','#FF6890']));

    }
    

    // this._p5.noFill('#000000');
    // this._p5.quad(
    //   tilePoints[0].x * this._s,
    //   tilePoints[0].y * this._s,
    //   tilePoints[1].x * this._s,
    //   tilePoints[1].y * this._s,
    //   tilePoints[2].x * this._s,
    //   tilePoints[2].y * this._s,
    //   tilePoints[3].x * this._s,
    //   tilePoints[3].y * this._s
    // )

    var p1 = this._p5.int(this._p5.random(1,3));
    var p2 = this._p5.int(this._p5.random(1,3));
    var p3 = this._p5.int(this._p5.random(1,3));
    var p4 = this._p5.int(this._p5.random(1,3));
    var p5 = this._p5.int(this._p5.random(1,3));


    for(var i=0; i< this.lines; i = i + this.p4){
      
        this._p5.line(
          (tilePoints[0].x * this._s) + i,
          (tilePoints[0].y * this._s) + i,
          (tilePoints[p1].x * this._s) + i,
          (tilePoints[p1].y * this._s) + i
        )
    
        this._p5.line(
          (tilePoints[p1].x * this._s) + i,
          (tilePoints[p1].y * this._s) + i,
          (tilePoints[p2].x * this._s) + i,
          (tilePoints[p2].y * this._s) + i
        )
  
        this._p5.line(
          (tilePoints[p2].x * this._s) + i,
          (tilePoints[p2].y * this._s) + i,
          (tilePoints[p3].x * this._s) + i,
          (tilePoints[p3].y * this._s) + i
        )

        this._p5.line(
          (tilePoints[p3].x * this._s) + i,
          (tilePoints[p3].y * this._s) + i,
          (tilePoints[p4].x * this._s) + i,
          (tilePoints[p4].y * this._s) + i
        )

        this._p5.line(
          (tilePoints[p4].x * this._s) + i,
          (tilePoints[p4].y * this._s) + i,
          (tilePoints[0].x * this._s) + i,
          (tilePoints[0].y * this._s) + i
        )





    }


    this._p5.fill('#000000');
    //this._p5.circle(tilePoints[0].x * this._s, tilePoints[0].y * this._s, this._p5.random(3))
    

  }

  afterDraw () {
    this.addGrain(this._p5.random(20,25))
  }

  static author () { return 'Shuhlam' }

  static name () { return 'Boilerplate' }
}
