// ------------------------------------------------------------- color

// always assumes 100% saturation
class HSL {
    constructor(l, h, s){
        this.h = h || Math.random() * 360
        // will start white if l is 100
        this.l = l || 100
        this.s = s || 100
    }
    randomHue(){
        this.h = Math.random() * 360
        this.l = 50
    }
    lighten(){
        if(this.l < 97) this.l += 3
        else this.l = 100
    }
    toString(){
        return `hsl(${this.h},${this.s}%,${this.l}%)`
    }
    toRGB(){
        // https://css-tricks.com/converting-color-spaces-in-javascript/
        // Must be fractions of 1
        let s = this.s / 100,
            l = this.l / 100,
            h = this.h;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return [r,g,b];


    }
}