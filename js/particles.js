
class Particle{
    constructor(x, y){
        this.pos = new Vec(x, y)
        // random speed
        this.dir = new Vec(0, randomGaussian(1, 3))
        this.dir.rotate(Math.random() * (Math.PI * 2))
        this.alpha = 255
    }
    decay(){
        this.alpha -= 10
    }
    isDead(){
        if(this.alpha < 10) return true
        return false        
    }
    move(){
        this.pos.add(this.dir)
        this.pos.round()
    }
}



function explodeRectangle(edges, ctx, particles = []){

    if(particles.length === 0 && edges === null) return

    if(edges){
        for(let e=0;e<edges.length;e++){
            const [a, b] = edges[e]
            a.round()
            b.round()
            particles = particles.concat(bline(a.x, a.y, b.x, b.y))
        }
    }

    imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height)

    for(let p=particles.length - 1; p>=0; p--){

        if( particles[p].isDead() ) {
            particles.splice(p, 1)
            continue
        }

        particles[p].decay()
        particles[p].move()

        const redIndex = getRedIndexForCoord(particles[p].pos.x, particles[p].pos.y, ctx.canvas.width)
        // red index + 3 = alpha index
        imageData.data[redIndex + 3] = particles[p].alpha
    }
    ctx.putImageData(imageData, 0, 0);


    requestAnimationFrame(() => {
        explodeRectangle(null, ctx, particles);
    })
}





function getRedIndexForCoord(x, y, width) {
    return y * (width * 4) + x * 4
}


// returns an arrray of all the integer x,y points along a line
const bline = (x0, y0, x1, y1) => {

    let arr = []
    const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    const dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
    let err = (dx>dy ? dx : -dy)/2;

    while (true) {
        arr.push(new Particle(x0,y0));
        if (x0 === x1 && y0 === y1) break;
        const e2 = err;
        if (e2 > -dx) { err -= dy; x0 += sx; }
        if (e2 < dy) { err += dx; y0 += sy; }
    }
    return arr
};



