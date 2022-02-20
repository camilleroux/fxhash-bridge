// Aqw_Zert
// Status: Ready
// Fxhash: https://www.fxhash.xyz/u/Aqw_Zert
// Wallet: tz1bD953oqrKK47eJhg9Bp3gFLVbeEvdqhix
import Style from './style'

export default class AqwUnderscoreZertStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5)
    this.woodCols    = [];
    this.lightWood   = ["#9B7652", "#BD9474", "#D1B7A3", "#DFD0C4"];
    this.redWood     = ["#7d280b","#48120c","#5c1d0c"]
    this.darkerWood  = ["#4E2A1B", "#341A0E", "#CE8757", "#040404", "#A65F23"]
    this.BWWood      = ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#EEEEEE"]
    this.linePerPils;
    this.nlayers;
  }

  beforeDraw () {
    this._p5.strokeCap(this._p5.SQUARE)
    this._p5.colorMode(this._p5.HSL, 360, 100, 100, 1);
    this._p5.rectMode(this._p5.CENTER);
    this._p5.ellipseMode(this._p5.CENTER);
    this._p5.noiseDetail(12, 0.85);
    this.drawBG();
    this.linePerPils = Math.floor(this._p5.random(7,12));
    this.nlayers = Math.floor(this._p5.random(5,12));
  }

  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    let sw = Math.abs(tilePoints[2].x-tilePoints[1].x)/(this.linePerPils);
    let layerThickness = (0.02*this._s)/this.nlayers;
    //RIGHT PILLARS
    if(frontLeftCorner3DCoord.x+1 == this._gridSizeX/2.0){
      //BACK
      let dx = Math.abs(tilePoints[2].x-tilePoints[1].x)*this._s/this.linePerPils
      this._p5.strokeWeight(this._s*sw/5.)
      this._p5.stroke(0);
      this._p5.line(tilePoints[2].x*this._s-sw/2.,tilePoints[2].y*this._s,
                    tilePoints[2].x*this._s-sw/2.,tilePoints[2].y*this._s)
      this._p5.noStroke();
      for(let i=1; i<this.linePerPils;i++){
        this._p5.strokeWeight(1.05*sw*this._s);
        this._p5.stroke(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))]);
        this._p5.line(tilePoints[2].x*this._s-sw/2.-i*dx,tilePoints[2].y*this._s,
                      tilePoints[2].x*this._s-sw/2.-i*dx,tilePoints[2].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.strokeWeight(this._s*sw/5.)
        this._p5.stroke(0);
        this._p5.line(tilePoints[2].x*this._s-sw/2.-i*dx,tilePoints[2].y*this._s,
                      tilePoints[2].x*this._s-sw/2.-i*dx,tilePoints[2].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.noStroke();
      }
      //
      //FRONT
      dx = Math.abs(tilePoints[3].x-tilePoints[0].x)*this._s/this.linePerPils
      this._p5.strokeWeight(this._s*sw/5.)
      this._p5.stroke(0);
      this._p5.line(tilePoints[3].x*this._s-sw/2.,tilePoints[3].y*this._s,
                    tilePoints[3].x*this._s-sw/2.,tilePoints[3].y*this._s)
      this._p5.noStroke();
      for(let i=1; i<this.linePerPils;i++){
        this._p5.strokeWeight(1.07*sw*this._s);
        this._p5.stroke(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))]);
        this._p5.line(tilePoints[3].x*this._s-sw/2.-i*dx,tilePoints[3].y*this._s,
                      tilePoints[3].x*this._s-sw/2.-i*dx,tilePoints[3].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.strokeWeight(this._s*sw/5.)
        this._p5.stroke(0);
        this._p5.line(tilePoints[3].x*this._s-sw/2.-i*dx,tilePoints[3].y*this._s,
                      tilePoints[3].x*this._s-sw/2.-i*dx,tilePoints[3].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.noStroke();
      }
    }
    //LEFT PILLARS
    if(frontLeftCorner3DCoord.x == -this._gridSizeX/2.0){
      let dx = Math.abs(tilePoints[2].x-tilePoints[1].x)*this._s/this.linePerPils
      this._p5.strokeWeight(this._s*sw/5.)
      this._p5.stroke(0);
      this._p5.line(tilePoints[1].x*this._s+sw/2.,tilePoints[1].y*this._s,
                    tilePoints[1].x*this._s+sw/2.,tilePoints[1].y*this._s)
      this._p5.noStroke();
      for(let i=1; i<this.linePerPils;i++){
        this._p5.strokeWeight(1.03*sw*this._s);
        this._p5.stroke(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))]);
        this._p5.line(tilePoints[1].x*this._s+sw/2.+i*dx,tilePoints[1].y*this._s,
                      tilePoints[1].x*this._s+sw/2.+i*dx,tilePoints[1].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.strokeWeight(this._s*sw/5.)
        this._p5.stroke(0);
        this._p5.line(tilePoints[1].x*this._s+sw/2.+i*dx,tilePoints[1].y*this._s,
                      tilePoints[1].x*this._s+sw/2.+i*dx,tilePoints[1].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.noStroke();
      }
      //
      dx = (tilePoints[3].x-tilePoints[0].x)*this._s/this.linePerPils
      this._p5.strokeWeight(this._s*sw/5.)
      this._p5.stroke(0);
      this._p5.line(tilePoints[1].x*this._s+sw/2.,tilePoints[1].y*this._s,
                    tilePoints[1].x*this._s+sw/2.,tilePoints[1].y*this._s)
      this._p5.noStroke();
      for(let i=1; i<this.linePerPils;i++){
        this._p5.strokeWeight(1.07*sw*this._s);
        this._p5.stroke(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))]);
        this._p5.line(tilePoints[0].x*this._s+sw/2.+i*dx,tilePoints[0].y*this._s,
                      tilePoints[0].x*this._s+sw/2.+i*dx,tilePoints[0].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.strokeWeight(this._s*sw/5.)
        this._p5.stroke(0);
        this._p5.line(tilePoints[0].x*this._s+sw/2.+i*dx,tilePoints[0].y*this._s,
                      tilePoints[0].x*this._s+sw/2.+i*dx,tilePoints[0].y*this._s
                      +0.2*this._s+0.01*this._s*this._p5.sin(i*this._p5.PI/this.linePerPils)/2)
        this._p5.noStroke();
      }
      this._p5.strokeWeight(this._s*sw/5.)
      this._p5.stroke(0);
      this._p5.line(tilePoints[2].x*this._s,tilePoints[1].y*this._s,
                    tilePoints[2].x*this._s,tilePoints[1].y*this._s)
      this._p5.noStroke();
    }

    // TILE THICKNESS
    this._p5.stroke(0);
    this._p5.strokeWeight(this._s*0.001)
    this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
    for(let i=this.nlayers; i>0; i--){
      this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
      this._p5.quad(tilePoints[0].x * this._s, tilePoints[0].y * this._s+layerThickness*i,
                    tilePoints[1].x * this._s, tilePoints[1].y * this._s+layerThickness*i,
                    tilePoints[2].x * this._s, tilePoints[2].y * this._s+layerThickness*i,
                    tilePoints[3].x * this._s, tilePoints[3].y * this._s+layerThickness*i)
    }
    // Finally fill the tiles with posibly small quads...
    this._p5.stroke(0);
    this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
    this._p5.strokeWeight(this._s*0.001)
    this.myQuad(tilePoints[0].x, tilePoints[0].y,
                tilePoints[1].x, tilePoints[1].y,
                tilePoints[2].x, tilePoints[2].y,
                tilePoints[3].x, tilePoints[3].y, this._p5.random(0.,1.))
  }

  afterDraw () {
    //????????
  }

  drawBG() {
    var sunX,sunY,sunR;
    let hueSky, satSky, brightSky;
    let satSea, brightSea;
    let x, y, sunColor, brightness;
    const [focalX, focalY] = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0]);
    this._p5.noStroke();
    let weather = this._p5.random(0,1)
    //DAY PHASE CHECKER
    if(weather<.11){
      this._p5.background(220, this._p5.random(35,65), this._p5.random(15,25), 1);
      [sunX,sunY]   = [this._p5.random(0,1)*this._s, this._p5.random(1./3.,1./2.5)*focalY*this._s];
      sunR          = this._p5.random(0.1,0.2)*this._s
      sunColor      = "#FE4C40"
      hueSky        = 221;
      satSky        = 100;
      brightSky     = 50;
      satSea        = 100;
      brightSea     = 20;
      this.woodCols = this.redWood;
    }
    else if(weather<0.44){
      this._p5.background(197, this._p5.random(80,100), this._p5.random(50,90), 1);
      [sunX,sunY]   = [this._p5.random(0,1)*this._s, this._p5.random(0,1./2.5)*focalY*this._s];
      sunR          = this._p5.random(0.2,0.25)*this._s
      sunColor      = "#f9e72a"
      hueSky        = 197;
      satSky        = 83;
      brightSky     = 92;
      satSea        = 92;
      brightSea     = 43;
      this.woodCols = this.lightWood;
    }
    else if(weather<0.82){
      this._p5.background(0, this._p5.random(0,15), this._p5.random(0,15), 1);
      [sunX,sunY]   = [this._p5.random(0,1)*this._s, this._p5.random(0,1./2.5)*focalY*this._s];
      sunR          = this._p5.random(0.1,0.2)*this._s
      sunColor      = "#F7EAC6"
      hueSky        = 252;
      satSky        = 100;
      brightSky     = 16;
      satSea        = 100;
      brightSea     = 5;
      this.woodCols = this.darkerWood;
    }
    else{
      this._p5.background(0, this._p5.random(0,15), this._p5.random(0,15), 1);
      [sunX,sunY]   = [this._p5.random(0,1)*this._s, this._p5.random(0,1./2.5)*focalY*this._s];
      sunR          = this._p5.random(0.1,0.2)*this._s
      sunColor      = "#FFFFFF"
      hueSky        = 0;
      satSky        = 0;
      brightSky     = 0;
      satSea        = 0;
      brightSea     = 0;
      this.woodCols = this.BWWood;
    }
    //SUN
    for (let j = 0; j < 1; j++){
      for (y = sunY-sunR; y < sunY+sunR; y += this._p5.random(0.001,0.005)*this._s) {
        let xtheta = sunR*Math.sin(Math.acos(y/sunR))
        this._p5.stroke(sunColor);
        this._p5.strokeWeight(this._s*this._p5.random(0.001,0.005));
        this._p5.line(sunX-xtheta+this._p5.random(-10*j,+10*j),y,
                      sunX+xtheta+this._p5.random(-10*j,+10*j),y)

        // WATER REFLECTS, nothing shiny here
        this._p5.stroke(sunColor);
        this._p5.strokeWeight(this._s*this._p5.random(0.0005,0.001));
        this._p5.line(sunX-xtheta+this._p5.random(-50*j,+50*j),(2.*focalY*this._s) - y,
                      sunX+xtheta+this._p5.random(-100*j,+100*j),(2.*focalY*this._s) - y)
      }
    }

    //SKY
    for (y = 0; y < focalY*this._s; y += this._p5.random(0.003,0.001)*this._s) {
      for (x = 0; x < 1.*this._s; x += this._p5.random(0.025,0.5)*this._s) {
        if (this._p5.random(0,1) > this._p5.random(0.5,0.9)) {
          this._p5.strokeWeight(this._p5.random(0.005,0.03)*this._s);
          this._p5.stroke(hueSky*this._p5.random(0.95,1.05),
                          this._p5.random(0.6,1.2)*satSky,
                          this._p5.random(0.6,1.2)*brightSky,
                          this._p5.random(0.01,0.05));
          this._p5.line(x + this._p5.random(-2, 2), y, x + this._p5.random(-1000, 1000), y + this._p5.random(-1, 1));
        }
      }
      this._p5.strokeWeight(this._p5.random(0.001,0.003)*this._s);
    }

    //SUN2, in front of sky, in case of very blurry sky...
    for (let j = 0; j < 1; j++){
      for (y = sunY-sunR; y < sunY+sunR; y += this._p5.random(0.005,0.02)*this._s) {
        let xtheta = sunR*Math.sin(Math.acos(y/sunR))
        this._p5.stroke(sunColor);
        this._p5.strokeWeight(this._s*this._p5.random(0.001,0.002));
        this._p5.line(sunX-xtheta+this._p5.random(-10*j,+10*j),y,
                      sunX+xtheta+this._p5.random(-10*j,+10*j),y)
        // WATER REFLECTS, nothing shiny here
        this._p5.stroke(sunColor);
        this._p5.strokeWeight(this._s*this._p5.random(0.0006,0.002));
        this._p5.line(sunX-xtheta+this._p5.random(-50*j,+50*j),(2.*focalY*this._s) - y,
                      sunX+xtheta+this._p5.random(-100*j,+100*j),(2.*focalY*this._s) - y)
      }
    }

    //SEA - From bottom to focalY++
    for (y = 0; y <1; y += this._p5.random(0.0001,0.0002)) {
      let noiseY = this._p5.noise(y+this._p5.random(123456,123456));
      for (x = 0; x < 1; x += this._p5.random(0.01,0.03)) {
        let yy = (focalY*this._s/1.2 + this._p5.noise(x) * 8) + y*this._s;
        let noiseGlob = (this._p5.cos(x * this._p5.PI * this._p5.random(0.33,0.66) + y * this._p5.PI * 1 + this._p5.noise(x*2, y*8) * this._p5.PI)) /(this._p5.random(0.33,0.66) - this._p5.noise(x, y)) * 2;
        if (this._p5.random(0,1) > this._p5.random(0.44,0.88)) {
          this._p5.stroke(230 + ((0.5 - this._p5.noise(x, y)) * 2) * 20,
                          this._p5.random(.8,1.20)*satSea*this._p5.noise(x / 4, y / 8),
                          this._p5.random(.8,1.20)*brightSea*this._p5.noise(x / 4, y / 8)-this._p5.random(0,40) * noiseGlob,
                          this._p5.random(.33,.66) * this._p5.random(0.33,0.66) * this._p5.pow(y, this._p5.random(0.33,0.88)));
          this._p5.line(x*this._s,
                        yy,
                        x*this._s + this._p5.random(-.5,     .5)*this._s * noiseGlob * noiseY * y,
                        yy        + this._p5.random(-0.015, 0.015)*this._s * noiseGlob * y);
        }
      }
    }

    //SKY
    for (y = 0; y < focalY*this._s; y += this._p5.random(0.003,0.001)*this._s) {
      for (x = 0; x < 1.*this._s; x += this._p5.random(0.025,0.5)*this._s) {
        if (this._p5.random(0,1) > this._p5.random(0.5,0.9)) {
          this._p5.strokeWeight(this._p5.random(0.005,0.03)*this._s);
          this._p5.stroke(hueSky*this._p5.random(0.95,1.05),
                          this._p5.random(0.6,1.2)*satSky,
                          this._p5.random(0.6,1.2)*brightSky,
                          this._p5.random(0.002,0.06));
          this._p5.line(x + this._p5.random(-2, 2), y, x + this._p5.random(-1000, 1000), y + this._p5.random(-1, 1));
        }
      }
      this._p5.strokeWeight(this._p5.random(0.001,0.003)*this._s);
    }

    //SUN2, in front of sky, in case of very blurry sky...
    for (let j = 0; j < 1; j++){
      for (y = sunY-sunR; y < sunY+sunR; y += this._p5.random(0.005,0.02)*this._s) {
        let xtheta = sunR*Math.sin(Math.acos(y/sunR))
        // WATER REFLECTS, nothing shiny here
        this._p5.stroke(sunColor);
        this._p5.strokeWeight(this._s*this._p5.random(0.0001,0.0002));
        this._p5.line(sunX-xtheta+this._p5.random(-50*j,+50*j),(2.*focalY*this._s) - y,
                      sunX+xtheta+this._p5.random(-100*j,+100*j),(2.*focalY*this._s) - y)
      }
    }
  }

  myQuad(x1,y1,x2,y2,x3,y3,x4,y4,p){
    this._p5.quad(x1 * this._s, y1 * this._s,
                  x2 * this._s, y2 * this._s,
                  x3 * this._s, y3 * this._s,
                  x4 * this._s, y4 * this._s)
    if(this._p5.random()<p){
      let xmid = this._p5.map(this._p5.random(0.4,0.6),0,1,x1,x3)
      let x12  = this._p5.map(this._p5.random(0.4,0.6),0,1,x1,x2)
      let x14  = this._p5.map(this._p5.random(0.4,0.6),0,1,x1,x4)
      let x34  = this._p5.map(this._p5.random(0.4,0.6),0,1,x4,x3)
      let x32  = this._p5.map(this._p5.random(0.4,0.6),0,1,x2,x3)
      let ymid = this._p5.map(this._p5.random(0.4,0.6),0,1,y1,y3)
      this._p5.stroke(0);
      this._p5.strokeWeight(0.0003*this._s);
      this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
      this._p5.quad(x1 *   this._s, y1 *   this._s,
                    x14 *  this._s, y1 *   this._s,
                    xmid * this._s, ymid * this._s,
                    x12 *  this._s, ymid * this._s)
      this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
      this._p5.quad(x4 *   this._s, y4 *   this._s,
                    x34 *  this._s, ymid *   this._s,
                    xmid * this._s, ymid * this._s,
                    x14 *  this._s, y4 * this._s)
      this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
      this._p5.quad(x2 *   this._s, y2 *   this._s,
                    x32 *  this._s, y2 *   this._s,
                    xmid * this._s, ymid * this._s,
                    x12 *  this._s, ymid * this._s)
      this._p5.fill(this.woodCols[Math.floor(this._p5.random(0,this.woodCols.length))])
      this._p5.quad(x3 *   this._s, y3 *   this._s,
                    x34 *  this._s, ymid *   this._s,
                    xmid * this._s, ymid * this._s,
                    x32 *  this._s, y3 * this._s)
    }
  }

  static author () { return 'Aqw_Zert' }

  static name () { return 'Sea' }
}