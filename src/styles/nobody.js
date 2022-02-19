// Nobody
// Status: Ready
// Twitter: @jorgemauro1000
// Fxhash: https://www.fxhash.xyz/u/Nobody
// Wallet: tz1dEU55vgDwFRSJBHUoD7WH2jbqkHkHPEYs

import Style from './style'
export default class Nobody extends Style {
    colorOBg=["#2a84b5","#000000","#611E1E","#611E1E","#f1f1f1","#f1f1f1","#E8D07B","#4C5A8F","#f1f1f1","#4C5A8F","#F2163E","#912d5c","#4e4187"]
    colorL=["#f1f1f1","#f1f1f1","#E8D07B","#2a84b5","#000000","#611E1E","#4C5A8F","#E8D07B","#4C5A8F","#f1f1f1","#DAFA96","#3cfaa1","#f8ffe5"]
    colorpicker=-1
  beforeDraw () {
    this.mul=this._p5.random(1,5)
    this.fillcel=this._p5.random(0,100)>50
    this.numberFunction=parseInt(this._p5.random(0,8))
    console.log(this.numberFunction)
    this.end=parseInt(this._p5.random(0,4))
    this.grainNumber=this._p5.random(18,30)
    if (!this.seed) this.seed = this._p5.random(9999999999)
    this._p5.noiseSeed(this.seed)
    this._p5.randomSeed(this.seed)
  this.colorpicker=parseInt(this._p5.random(0,9))
  this._p5.background(this.colorOBg[this.colorpicker])
  this.endOfRoad(this.end)
  }
  
  drawTile (tilePoints, frontLeftCorner3DCoord, isBorder) {
    if(!isBorder){
    this.noiselineTile(tilePoints[0].x*this._s, tilePoints[0].y* this._s,tilePoints[1].x * this._s,tilePoints[1].y* this._s,this.mul,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this._s,this.numberFunction,this.numberFunction==1?0.3:1)
    this.noiselineTile(tilePoints[3].x*this._s, tilePoints[3].y* this._s,tilePoints[0].x * this._s,tilePoints[0].y* this._s,this.mul,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this._s,this.numberFunction,this.numberFunction==1?0.3:1)
    this.noiselineTile(tilePoints[1].x*this._s, tilePoints[1].y* this._s,tilePoints[2].x * this._s,tilePoints[2].y* this._s,this.mul,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this._s,this.numberFunction,this.numberFunction==1?0.3:1)
    this.noiselineTile(tilePoints[3].x*this._s, tilePoints[3].y* this._s,tilePoints[2].x * this._s,tilePoints[2].y* this._s,this.mul,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this._s,this.numberFunction,this.numberFunction==1?0.3:1)
    }else{
        if(this.numberFunction!=0&&this.numberFunction!=1){
            for(let l=0;l<4;l++){
            let p1=tilePoints[0]
            let p2=tilePoints[1]
            let p3=tilePoints[2]
            let p4=tilePoints[3]
            let distx=Math.abs((p2.x-p1.x)*this._s)
            let disty=Math.abs((p3.y-p1.y)*this._s)
            this.rectNoise(p1.x*this._s,p1.y*this._s,distx,disty,this.mul,2,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this.numberFunction)
        }
        }
    }
  }
  endOfRoad(chooseEnd){
    let x=this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0])[0]*this._s
    let y=this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0])[1]*this._s
    let raio = this._projectionCalculator3d.getProjectedPoint([-this._gridSizeX / 2, this._gridSizeY, 0])[0]*this._s
    for(let o=0;o<this._s/2;o++){
       if(chooseEnd!=2&&chooseEnd!=3)
        this.rectNoise(this._p5.random(0,x-raio/3),this._p5.random(0,y),20,20,this.mul,2,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this.numberFunction)
      else
        this.circleNoise(this._p5.random(0,x-raio/3),this._p5.random(0,y),10,this.numberFunction==1?5:10,5,this._p5.color(this.colorL[this.colorpicker]),false,this.numberFunction,0.3)
        
    }
    for(let o=0;o<this._s;o++){
    if(chooseEnd!=2&&chooseEnd!=3)
       this.rectNoise(this._p5.random(x+raio/3,x+this._s),this._p5.random(0,y),20,20,this.mul,2,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this.numberFunction)
    else
       this.circleNoise(this._p5.random(x+raio/3,x+this._s),this._p5.random(0,y),10,this.numberFunction==1?5:10,5,this._p5.color(this.colorL[this.colorpicker]),false,this.numberFunction,0.3)
        
    }
    console.log(this.numberFunction)
    if(this._projectionCalculator3d.points2d[5][1]>0.02&&chooseEnd!==1){
        for(let o=0;o<this._s/4;o++){        
            if(chooseEnd!=2&&chooseEnd!=3)
                this.rectNoise(this._p5.random(x-raio/2,x+raio/2),this._p5.random(0,y-this._s/4),20,20,this.mul,2,this._p5.color(this.colorL[this.colorpicker]),this.fillcel,this.numberFunction)
            else
            this._projectionCalculator3d.points2d[5][1]>0.03&&this.circleNoise(this._p5.random(x-raio/2,x+raio/2),this._p5.random(0,y-raio/2),8,this.numberFunction==1?5:10,5,this._p5.color(this.colorL[this.colorpicker]),false,this.numberFunction,0.3)
        }
    }
    switch(chooseEnd){
        case 0:
            return this.noiseline(x, y-raio/2, x,y,raio,this._p5.color(this.colorL[this.colorpicker]),false,this._s,3,2)
            break;
        case 1:
            return this.noiseline(x-raio/4, y-raio/2, x+raio/4,y-raio/2,raio,this._p5.color(this.colorL[this.colorpicker]),false,this._s,4,1)
        case 2:
            return this.circleNoise(x,y-raio/4,raio/2*0.7,this.numberFunction==1?5:10,5,this._p5.color(this.colorL[this.colorpicker]),false,this.numberFunction)
            break;
        case 3:
            return this.circleNoise(x,y-raio/4,raio/2*0.7,this.numberFunction==1?5:10,5,this._p5.color(this.colorL[this.colorpicker]),false,this.numberFunction)
            break;
    }
  }
    noiseline(x1,y1,x2,y2,mul,color1,fillv,sqr,numberFunction,strokew){
    let p1 = this._p5.createVector(x1,y1)
    let p2 = this._p5.createVector(x2,y2)
    let angleBetween = this.angleBtwPoint(p1,p2)
    let dist = p1.dist(p2)
    this._p5.beginShape()
    this._p5.stroke(color1)
    strokew?this._p5.strokeWeight(strokew):this._p5.strokeWeight(0.3)
    fillv?this._p5.fill(color1):this._p5.noFill()
    let mult=fillv?1.5:1
    for(let i=0;i<dist;i+=sqr/800){
      let noisemod = this._p5.map(this._p5.noise(this._p5.random(10000),i*1),0,1,sqr*0.00002*mul,sqr/900*mul)
      let getxy=this.returxy(numberFunction,i,noisemod*mult)
      let x = p1.x + (i*Math.cos(angleBetween)) + getxy.xadd
      let y = p1.y + (i*Math.sin(angleBetween)) + getxy.yadd
      this._p5.curveVertex(x,y)
    }
    this._p5.endShape()
  }
  noiselineTile(x1,y1,x2,y2,mul,color1,fillv,sqr,numberFunction,strokew){
    let p1 = this._p5.createVector(x1,y1)
    let p2 = this._p5.createVector(x2,y2)
    let angleBetween = this.angleBtwPoint(p1,p2)
    let dist = p1.dist(p2)
    this._p5.beginShape()
    this._p5.stroke(color1)
    strokew?this._p5.strokeWeight(strokew):this._p5.strokeWeight(0.3)
    fillv?this._p5.fill(color1):this._p5.noFill()
    let mult=fillv?1.5:1
    for(let i=0;i<dist;i+=sqr/800){
      let noisemod = this._p5.map(this._p5.noise(this._p5.random(10000),i*1),0,1,sqr*0.00002*mul,sqr/900*mul)
      let getxy=this.returxy(numberFunction,i,noisemod*mult)
      let x = p1.x + (i*Math.cos(angleBetween)) + getxy.xadd
      let y = p1.y + (x1>x2?i*Math.sin(angleBetween):i*Math.sin(-angleBetween)) + getxy.yadd
      this._p5.curveVertex(x,y)
    }
    this._p5.endShape()
  }
  circleNoise(x,y,sz,grant,dist,c1,fill,mul,strokew){
    let diam
    let countStage=0
    diam=x+sz
      for(let i=x-sz;i<diam;i+=dist){
          let sg = (countStage*dist) + dist;
          let linelenght = (Math.sqrt((2*sg*sz) - (sg*sg))*2);
          let y1=y-sz/10-linelenght/2
          let y2=y+sz/10+linelenght/2
          let noisedislocate=this._p5.map(this._p5.noise(i),0,3,-sz*0.3,sz*0.3)
          this.noiseline(i,y1+noisedislocate,i,y2+noisedislocate,grant,c1,fill,this._s,mul,strokew?strokew:2)
          countStage++
        }
    }
    rectNoise(x,y,sz1,sz2,grant,dist,c1,fill,mul){
        this._p5.push()
          for(let i=x;i<x+sz1;i+=dist){
            this.noiseline(i,y,i,y+sz2,grant,c1,fill,this._s,mul,0.5)
          }
        this._p5.pop()
        }
    grain(number) {
        this._p5.loadPixels()
       let total=this._s * this._p5.pixelDensity()*this._s * this._p5.pixelDensity() * 4
        for (let e = 0; e <total ; e += 4) {
          let i = this._p5.map(this._p5.random(), 0, 1, -number, number)
          this._p5.pixels[e] = this._p5.pixels[e] + i
          this._p5.pixels[e + 1] = this._p5.pixels[e + 1] + i
          this._p5.pixels[e + 2] = this._p5.pixels[e + 2] + i
          this._p5.pixels[e + 3] = this._p5.pixels[e + 3] + i
        }
        this._p5.updatePixels()
      }
  returxy(n,interetion,mod){
    switch(n){
      case 0:
        return({xadd:Math.tan(-interetion/2)*mod,yadd:Math.cos(interetion)*mod})
        break;
      case 1:
        return({xadd:Math.sin(interetion)*mod,yadd:Math.tan(-interetion)*mod})
        break;
      case 2:
        return({xadd:Math.cos(interetion*interetion*interetion)*mod,yadd:Math.sin(interetion*interetion*interetion)*mod})
        break;
      case 3:
        return({xadd:Math.cos(interetion)*Math.sin(interetion)*mod*1.5,yadd:0})
        break;
      case 4:
        return({xadd:0,yadd:Math.cos(interetion)*Math.sin(interetion)*mod*4})
        break;
      case 5:
        return({xadd:Math.cos(interetion)*mod,yadd:Math.sin(interetion)/mod})
        break;
      case 6:
        return({xadd:Math.sin(interetion)*mod,yadd:Math.cos(interetion*0.3)*mod})
        break;
      case 7:
        return({xadd:this._p5.noise(interetion*mod)*mod,yadd:this._p5.noise(interetion*mod)*mod})
        break;
      case 8:
        return({xadd:-Math.cos(interetion)*mod,yadd:-Math.cos(interetion)*mod})
        break;
    }
  }
angleBtwPoint=(p1,p2)=>{
    let deltY=Math.abs(p1.y-p2.y)
    let deltX=Math.abs(p1.x-p2.x)
    return Math.atan2(deltY, deltX)
    }
  afterDraw () {
    this.grain(this.grainNumber)
  }

  static author () { return 'Nobody' }

  static name () { return 'Anaesthesia style' }
}