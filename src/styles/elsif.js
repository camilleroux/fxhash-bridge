// Elsif
// Status: Ready // "WIP", "Ready"
// Twitter: @ElsifThen
// Fxhash: https://www.fxhash.xyz/u/elsif
// Wallet: tz2E2R7xBGTaDUpsERfZVLLY5nrswWAvp9xK

import Style from './style'
import { createCols } from '../utils'

const palettes = [
    'https://coolors.co/fdfffc-f44336-011627',
    'https://coolors.co/011627-f44336-fdfffc',
    'https://coolors.co/fdfffc-011627-011627',
];
export default class ElsifStyle extends Style {
    constructor(gridSizeX, gridSizeY, s, projectionCalculator3d, p5) {
        super(gridSizeX, gridSizeY, s, projectionCalculator3d, p5);
        this.far = this._projectionCalculator3d.getProjectedPoint([0, this._gridSizeY, 0]).map(x => x * s);
        const farLeft = this._projectionCalculator3d.getProjectedPoint(
            [-this._gridSizeX / 2, this._gridSizeY, 0]).map(x => x * s);
        this.farSize = this.far[0] - farLeft[0];
        this.focal = [this.far[0], this.far[1] - this.farSize];
        const wormhole = Math.floor(p5.random() * 4);
        const palette = p5.random([0, 0, 0, 1, 2]);
        this.colors = createCols(palettes[palette]);
        this.config = {
            wormhole: wormhole,
            terrain: (this.focal[1] < s / 3 || wormhole < 2) ? true : p5.random() > 0.8,
            colors: this.colors,
            stand: p5.random() < 0.3,
        };

        this.fgColor = this.colors[0];
        this.accentColor = this.colors[1];
        this.bgColor = this.colors[2];
        this.terrainColor = this.colors[1];
        this.setTileColors();
    }

    beforeDraw() {
        this.drawWormhole();
        if (this.config.terrain) {
            this.drawTerrain();
        }
    }

    drawWormhole() {
        let p5 = this._p5;
        const type = this.config.wormhole;
        let TWO_PI = p5.TWO_PI;
        let bg = this.fgColor;
        let fg = this.bgColor;
        let maxJ = 100;
        let amp = 1;
        let minSize = this._s / 4;
        let frequency = Math.PI / 20;
        if (type == 1) {
            maxJ = 30;
            minSize = this._s;
            frequency = 0.1;
        } else if (type == 2) {
            maxJ = 40;
            amp = 1.5;
            minSize = this._s / 2 + this.farSize;
            frequency = 0.1;
        } else if (type == 3) {
            maxJ = 60;
            frequency = 10;
        }
        const startAngle = TWO_PI * p5.random();

        p5.push()
        p5.background(bg);
        p5.translate(this.focal[0], this.focal[1]);
        p5.strokeWeight(this._s / 1000);
        for (let j = 0; j < maxJ; j++) {
            let size = minSize * (2 + amp * p5.sin(j));
            let step = TWO_PI / (50 + p5.sin(j * frequency) * 20);
            p5.noFill();

            if (j % 60 != 0) {
                p5.stroke(fg);
            } else {
                p5.stroke(this.accentColor);
            }
            for (let i = startAngle; i < TWO_PI + startAngle; i += step) {
                p5.push();
                p5.rotate(i);

                if (type != 2) {
                    p5.rect(0, 0, size * (1 + 0.2 * p5.random()));
                } else {
                    p5.circle(0, 0, size * (1 + 0.3 * p5.random()));
                }
                p5.pop();
            }
        }
        if (type == 1) {
            p5.filter(p5.BLUR, 1);
        } else if (type == 2) {
            p5.filter(p5.BLUR, 1);
        }
        p5.pop();
    }

    drawTerrain() {
        const pg = this._p5.createGraphics(this._s, this._s, this._p5.WEBGL);
        pg.setAttributes('alpha', true)
        const rows = 40;
        const cols = 40;
        const noiseStep = 0.5;
        const maxZ = this._s / 8;
        const scale = this._s / 30;

        pg.noStroke();
        let color = pg.color(this.terrainColor);
        pg.colorMode(pg.HSB);
        let hue = pg.hue(color);
        let saturation = pg.saturation(color);

        pg.rotateX(pg.PI / 3);
        pg.translate(-this._s / 2, Math.max(this.far[1] - this._s / 2 + 2 * maxZ, 0));
        pg.pointLight(0, 0, 100, maxZ / 2, -maxZ, maxZ);
        let getZ = function (x, y) {
            return maxZ - pg.noise(x * noiseStep, y * noiseStep) * maxZ * 2;
        }
        let lastZ = [];
        for (let x = 0; x < cols; x++) {
            lastZ[x] = getZ(x, 0);
        }
        for (let y = 1; y < rows; ++y) {
            pg.beginShape(pg.TRIANGLE_STRIP);
            for (let x = 0; x < cols; ++x) {
                let z = getZ(x, y);
                pg.fill(hue, saturation, 10 + 90 * this._p5.random());
                pg.vertex(x * scale, (y - 1) * scale, lastZ[x]);
                pg.vertex(x * scale, y * scale, z);
                lastZ[x] = z;
            }
            pg.endShape();
        }
        this._p5.image(pg, 0, 0);
        pg.remove();
    }

    drawTile(tilePoints, frontLeftCorner3D) {
        const p5 = this._p5;
        p5.stroke(this.tileBorder);
        let c = p5.color(this.tileColor);
        c.setAlpha(100);
        p5.fill(c);
        const size = this._s;
        p5.quad(...tilePoints.map(p => [p.x * size, p.y * size]).flat());

        if (this.config.stand) {
            const projector = this._projectionCalculator3d;
            const fp = frontLeftCorner3D;
            let addVertex = function(point, x, y, z) {
                return p5.createVector().set(projector.getProjectedPoint(
                    [point.x+x, point.y+y, point.z+z]));
            }
            let makeStand = function(point) {
                let scale = 0.03;
                let face = [
                    addVertex(point, 0, 0, -scale),
                    addVertex(point, 0, 0, 0),
                    addVertex(point, 1, 0, 0),
                    addVertex(point, 1, 0, -scale),
                ];
                p5.quad(...face.map(p => [p.x * size, p.y * size]).flat());
            }
            makeStand(fp);
        }
    }

    afterDraw() {
    }

    setTileColors() {
        const wormhole = this.config.wormhole;
        const terrain = this.config.terrain;
        const p5 = this._p5;
        const tileStyle = p5.random();
        if (wormhole != 2) {
            this.tileBorder = this.fgColor;
            this.tileColor = this.fgColor;
            if (terrain && this.fgColor == '#011627') {
                this.tileBorder = this.bgColor;
            }
            if (tileStyle < 0.3) {
                this.tileBorder = this.accentColor;
            } else if (tileStyle < 0.6) {
                this.tileBorder = this.bgColor;
            } else if (!this.config.terrain) {
                this.tileColor = this.bgColor;
            }
        } else {
            this.tileBorder = this.bgColor;
            this.tileColor = this.fgColor;
            if (tileStyle < 0.3) {
                this.tileBorder = this.accentColor;
            } else if (tileStyle < 0.6) {
                this.tileBorder = this.fgColor;
                this.tileColor = this.accentColor; 
            }
        }
    }

    static author() { return 'Elsif' }
    static name() { return 'Einstein–Rosen' }
}
