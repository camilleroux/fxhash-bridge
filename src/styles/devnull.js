// devnull
// Status: Ready
// Twitter: @lostpunks
// Fxhash: https://www.fxhash.xyz/u/devnull
// Wallet: tz1QbXQrLXNrsuAB3VpuhzYLAK5bSN4YVBKd

import Style from './style'

export default class DevnullStyle extends Style {
  constructor (gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
    super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5);
    this.cx = this._p5.drawingContext;
    this.lerpMap = {};
    this.epsilon = 0.000000000001;
  }

  beforeDraw () {
    this.cx.strokeStyle = "#000000";
    this.cx.lineWidth = 1 / (window.devicePixelRatio || 1);
    this.rand = DevnullStyle.mulberry32(DevnullStyle.xmur3(fxhash)());
    this.colors = DevnullStyle.getColors(DevnullStyle.getColorCount(this.rand()), this.rand);
    this.lastY = 0;
    this.currentTiles = [];
    this.drewBackground = false;

    let value = this.rand();
    if (value < .6) {
      this.minHeight = 2;
      this.maxHeight = 3;
    } else if (value < .85) {
      this.minHeight = 3;
      this.maxHeight = 4;
    } else {
      this.minHeight = 1;
      this.maxHeight = 2;
    }
  }

  drawTile(tilePoints, frontLeftCorner3DCoord, isBorder) {
    if (!this.drewBackground) {
      this.drawBackground(tilePoints[1].y * this._s);
      this.drewBackground = true;
    }

    if (Math.abs(tilePoints[0].y - this.lastY) > this.epsilon) {
      this.flushCurrentTiles();
    }

    this.currentTiles.push({ t: tilePoints, b: isBorder });
    this.lastY = tilePoints[0].y;
  }

  flushCurrentTiles() {
    if (!this.currentTiles.length) {
      return;
    }

    var sortedTiles = this.currentTiles.sort((t1, t2) => { return t1.t[0].x - t2.t[0].x });
    var multiTiles = [];
    var lastTile = sortedTiles.shift();
    var count = 1;
    while (sortedTiles.length > 0) {
      let lastX = lastTile.t[3].x;
      let nextTile = sortedTiles.shift();
      let nextX = nextTile.t[0].x;
      let width = Math.abs(nextTile.t[3].x - nextX);
      if ((nextTile.b == lastTile.b) && (Math.abs(nextX - lastX) < this.epsilon)) {
        lastTile.t[2].x = nextTile.t[2].x;
        lastTile.t[3].x = nextTile.t[3].x;
        ++count;
      } else {
        multiTiles.push({ t: lastTile.t, c: count, b: lastTile.b });
        lastTile = nextTile;
        count = 1;
      }
    }
    multiTiles.push({ t: lastTile.t, c: count, b: lastTile.b });
    multiTiles.sort((t1, t2) => { 
      let d1 = Math.min(Math.abs(t1.t[0].x - 0.5), Math.abs(t1.t[3].x - 0.5));
      let d2 = Math.min(Math.abs(t2.t[0].x - 0.5), Math.abs(t2.t[3].x - 0.5));
      return d2 - d1; 
    }).forEach(tc => this.drawMultiTile(tc.t, tc.c, tc.b));
  }

  drawMultiTile(tilePoints, count, isBorder) {
    let floorCount = isBorder ? (this.maxHeight) : this.minHeight + Math.floor(this.rand() * (1 + this.maxHeight - this.minHeight));
    let width = Math.ceil((tilePoints[3].x - tilePoints[0].x) * this._s);
    let depth = (tilePoints[0].y - tilePoints[1].y) * this._s;
    let yb = tilePoints[0].y * this._s;
    let yt = tilePoints[1].y * this._s;
    let b = { 
      xbl: tilePoints[0].x * this._s, 
      xbr: tilePoints[3].x * this._s, 
      xtl: tilePoints[1].x * this._s, 
      xtr: tilePoints[2].x * this._s, 
      yb: yb,
      yt: yb - 3 * (yb - yt) / 4,
      w: count,
      b: isBorder,
      floorHeights: Array.from(Array(floorCount).keys(), p => isBorder ? 1.5 * width / count : Math.ceil(width / count * (1 + Math.floor(this.rand() * 3)) / 2))
    };

    this.drawBuilding(b, width, depth, this.maxHeight);
  }

  afterDraw () {
    this.flushCurrentTiles();
  }

  drawBuilding(building, width, depth, maxHeight) {
    let color = this.colors[Math.floor(this.rand() * this.colors.length)];
    var yy = building.yb;
    for (var f = 0; f < building.floorHeights.length; ++f) {
      let isTopFloor = (f == maxHeight - 1);
      let height = building.floorHeights[f];
      let floor = {
        xbl: building.xbl, 
        xbr: building.xbr, 
        xtl: building.xtl, 
        xtr: building.xtr, 
        yb: yy,
        yt: yy + building.yt - building.yb,
        w: building.w,
        b: building.b
      }
      this.drawCubeFloor(floor, width, height, depth, color, isTopFloor);
      yy -= height;
    }
  };

  drawCubeFloor(b, w, h, d, c, topFloor) {
    this.drawCube(b, h, c, topFloor);
    let windowCountX = 4 * b.w;
    let windowSize = w / (windowCountX + (windowCountX + 2) / 2);
    let windowGap = windowSize / 2;
    let marginX = (w - windowCountX * windowSize - (windowCountX - 1) * windowGap) / 2;
    let windowCountY = 1 + Math.floor((h - 2 * windowGap - windowSize) / (windowSize + windowGap));
    let marginY = (h - windowCountY * windowSize - (windowCountY - 1) * windowGap) / 2;
    let drawRails = (this.rand() < 0.5) && (h * b.w > w);
    for (var i = 0; i < 2 * windowCountX; ++i) {
      for (var j = 0; j < windowCountX; ++j) {
        if ((i >= (drawRails ? windowCountY / 2 : 0)) && (i < windowCountY)) {
          let yy = marginY + i * (windowSize + windowGap);
          let xx = marginX + j * (windowSize + windowGap);
          this.cx.fillStyle = this.lerpColor(c, 0.2 + Math.floor(this.rand() * 10) * 0.05, 255);
          this.cx.fillRect(b.xbl + xx, b.yb - yy - windowSize, windowSize, windowSize);
          this.cx.strokeRect(b.xbl + xx, b.yb - yy - windowSize, windowSize, windowSize);
        } else {
          this.rand();
        }
      }
    }
    if (drawRails) {
      for (var i = 0; i < windowCountY; ++i) {
        let yy = marginY + i * (windowSize + windowGap) / 2;
        let overflow = marginX / 2;
        let topOverflow = overflow * (b.xtr - b.xtl) / (b.xbr - b.xbl);
        this.cx.beginPath();
        if (b.xtr > b.xbr) {
          this.cx.moveTo(b.xbl, b.yb - yy - overflow);
          this.cx.lineTo(b.xbl - overflow, b.yb - yy);
          this.cx.lineTo(b.xbr + overflow, b.yb - yy);
          this.cx.lineTo(b.xtr + topOverflow, b.yt - yy - topOverflow);
          this.cx.lineTo(b.xtr, b.yt - yy - topOverflow);
        } else if (b.xtl < b.xbl) {
          this.cx.moveTo(b.xbr, b.yb - yy - overflow);
          this.cx.lineTo(b.xbr + overflow, b.yb - yy);
          this.cx.lineTo(b.xbl - overflow, b.yb - yy);
          this.cx.lineTo(b.xtl - topOverflow, b.yt - yy - topOverflow);
          this.cx.lineTo(b.xtl, b.yt - yy - topOverflow);
        } else {
          this.cx.moveTo(b.xbl, b.yb - yy - overflow);
          this.cx.lineTo(b.xbl - overflow, b.yb - yy);
          this.cx.lineTo(b.xbr + overflow, b.yb - yy);
          this.cx.lineTo(b.xbr, b.yb - yy - overflow);          
        }
        this.cx.stroke();
      }
    }
  };

  drawCube(b, h, c, topFloor) {
    let frontColor = c;
    let sideColor = this.lerpColor(frontColor, 0.33, 255);
    let topColor = this.lerpColor(frontColor, 0.66, 255);

    var frontGradient = this.cx.createLinearGradient(b.xbl, 0, b.xbr, 0);
    frontGradient.addColorStop(0, this.lerpColor(frontColor, 0.15, 0));
    frontGradient.addColorStop(1, frontColor);

    var topGradient = this.cx.createLinearGradient(0, b.yt - h, 0, b.yb - h);
    topGradient.addColorStop(0, this.lerpColor(topColor, 0.15, 0));
    topGradient.addColorStop(1, topColor);

    this.fillQuad(b.xbl, b.yb - h, b.xbr, b.yb - h, b.xbr, b.yb, b.xbl, b.yb, frontGradient);
    this.fillQuad(b.xbl, b.yb - h, b.xbr, b.yb - h, b.xtr, b.yt - h, b.xtl, b.yt - h, b.b ? frontGradient : topGradient);

    if (b.xtl < b.xbl || b.xtr > b.xbr) {
      let xb = b.xtr > b.xbr ? b.xbr : b.xbl;
      let xt = b.xtr > b.xbr ? b.xtr : b.xtl;

      var sideGradient = this.cx.createLinearGradient(xb, 0, xt, 0);
      sideGradient.addColorStop(0, this.lerpColor(sideColor, 0.15, 0));
      sideGradient.addColorStop(1, sideColor);

      this.fillQuad(xb, b.yb, xt, b.yt, xt, b.yt - h, xb, b.yb - h, sideGradient);
    }

    let bd = (b.xbr - b.xbl) / (6 * b.w);
    let td = (b.xtr - b.xtl) / (6 * b.w);
    var xbl = b.xbl + bd;
    var xbr = b.xbr - bd;
    var xtl = b.xtl + td;
    var xtr = b.xtr - td;
    var ybl = b.yb - h;
    var ytl = b.yt - h;
    var ybr = b.yb - h;
    var ytr = b.yt - h;
    if (xbl == xtl) {
      ybl -= bd;
      ytl += td;
    } else {
      var alpha = Math.atan((ybl - ytl) / (xtl - xbl));
      if (xtl < xbl) {
        alpha += Math.PI;
      }
      xbl += Math.cos(alpha) * bd;
      xtl -= Math.cos(alpha) * td;
      ybl -= Math.sin(alpha) * bd;
      ytl += Math.sin(alpha) * td;
    }
    if (xbr != xtr) {
      var alpha = Math.atan((ybr - ytr) / (xtr - xbr));
      if (xtr < xbr) {
        alpha += Math.PI;
      }
      bd = (ybr - ybl) / Math.sin(alpha);
      td = (ytl - ytr) / Math.sin(alpha);
      xbr += Math.cos(alpha) * bd;
      xtr -= Math.cos(alpha) * td;
    }
    ybr = ybl;
    ytr = ytl;
    this.fillQuad(
      xbl, ybl, 
      xtl, ytl,
      xtr, ytr,
      xbr, ybr,
      b.b ? topGradient : frontGradient);
  };

  fillQuad(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    let path = new Path2D();

    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.lineTo(x3, y3);
    path.lineTo(x4, y4);
    path.closePath();

    this.cx.fillStyle = color;
    this.cx.fill(path);
    this.cx.stroke(path);
  };

  drawBackground(skyline) {
    var colors;
    if (this.colors.length < 3) {
      colors = [this.colors[0], this.lerpColor(this.colors[0], 0.5, 0), this.lerpColor(this.colors[0], 0.5, 255)];
    } else {
      colors = [this.colors[0], this.lerpColor(this.colors[1], 0.3, 0), this.colors[2]];
    }

    let staticMoonX = Math.ceil(this._s / 4 + this.rand() * this._s / 2);
    let staticMoonY = Math.ceil(this._s / 4 + this.rand() * this._s / 2);
    let moonR = Math.ceil(this._s / 8 + this.rand() * this._s / 8);

    let angle = (3 * Math.PI / 4 + (this.rand() < 0.5 ? 90 : 450) * Math.PI / 180 / 2) % (2 * Math.PI);

    let moonTop = -moonR / 2
    let moonBottom = (skyline + 3 * moonR / 2);
    let moonDistance = moonBottom - moonTop;

    let moonY = moonTop + (1 + Math.sin(angle)) * moonDistance / 2;

    let dayTimeOffset = -Math.sin(angle);
    let target = dayTimeOffset > 0 ? 255 : 0;
    let value = Math.abs(dayTimeOffset / 2);
    colors = [this.lerpColor(colors[0], value, target), colors[1], this.lerpColor(colors[2], value, target)];

    let moonLeft = 0;
    let moonRight = this._s;
    let cappedAngle = (angle < Math.PI / 2) ? 0 : (angle < Math.PI) ? Math.PI : angle;
    let moonX = Math.cos(cappedAngle) * Math.max(moonR, this._s / 4) + this._s / 2;

    let gridSizeY = window.$fxhashFeatures['gridSizeY'];

    var skyGradient = this.cx.createLinearGradient(0, skyline - 2 * gridSizeY, 0, skyline);
    skyGradient.addColorStop(0, colors[0]);
    skyGradient.addColorStop(1, this.lerpColor(colors[0], 0.15, 0));
    this.cx.fillStyle = skyGradient;
    this.cx.fillRect(0, 0, this._s, skyline);

    this.cx.fillStyle = colors[1];
    this.cx.beginPath();
    this.cx.ellipse(moonX, moonY, moonR, moonR, 0, 0, 2 * Math.PI);
    this.cx.fill();
    this.cx.stroke();

    var groundGradient = this.cx.createLinearGradient(0, skyline, 0, skyline + gridSizeY);
    groundGradient.addColorStop(0, this.lerpColor(colors[2], 0.15, 0));
    groundGradient.addColorStop(1, colors[2]);
    this.cx.fillStyle = groundGradient;
    this.cx.fillRect(0, skyline, this._s, this._s - skyline);
    this.cx.strokeRect(0, skyline, this._s, 0);
  };

  lerpColor(hexColor, v, target) {
    let key = hexColor + "[" + v + "]" + target;
    var value = this.lerpMap[key];

    if (!value) {
      let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
      let r1 = parseInt(rgb[1], 16);
      let g1 = parseInt(rgb[2], 16);
      let b1 = parseInt(rgb[3], 16);

      let r = Math.floor(r1 + v * (target - r1));
      let g = Math.floor(g1 + v * (target - g1));
      let b = Math.floor(b1 + v * (target - b1));

      value = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

      this.lerpMap[key] = value;
    }

    return value;
  };

  static getColors(count, rand) {
    var colors = rand() < .5 
      ? [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#e377c2" ]
      : [ "#aec7e8", "#98df8a", "#9edae5", "#ff9896", "#f7b6d2", "#c5b0d5" ];
    for (var i = colors.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var temp = colors[i];
      colors[i] = colors[j];
      colors[j] = temp;
    }
    return colors.slice(0, count);
  };

  static getColorCount(value) {
    if (value < 0.45) {
      return 3;
    } else if (value < 0.85) {
      return 6;
    } else {
      return 1;
    }
  }

  static xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
  };

  static mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  };

  static author () { return 'devnull' }

  static name () { return 'Citadel' }
}
