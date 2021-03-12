const RADII = 50,
      GRAVITY = 0,
      INITIAL_VELOCITY = 10,
      // GRAVITY = .2,
      FRICTION = .999,
      DAMPEN = .9;



// ------------------------------------------------------------ circle

class Circle {

    constructor(x, y, radius){

        this.velocity = INITIAL_VELOCITY

        this.fill = new HSL()

        this.r = radius || RADII

        // position
        this.pos = new Vec(x, y) 

        // direction starts by pointing down
        this.dir = new Vec(0, - this.velocity)
        // if no gravity random 360deg start direction
        if(!GRAVITY)
            this.dir.rotate(Math.random() * (2 * Math.PI))

    }
    move(){
        // object reference of pos, dir, fill
        const { pos, dir, fill, r } = this

        const w = window.innerWidth,
              h = window.innerHeight

        dir.limit(0, FRICTION)

        fill.lighten()

        // change direction if reached edge
        if(pos.y + r > h || pos.y - r < 0){
            dir.invertY();
            if(pos.y + r > h){
                // dampen upon hitting bottom
                dir.limit(0, DAMPEN)
                // I have to move this up here 'cause of dampen
                // which wouldn't move circle cleanly back into frame
                pos.y = h - r
                fill.randomHue()
            }
        }

        if(pos.x + r > w || pos.x - r < 0)
            dir.invertX()

        // gravity
        if(GRAVITY)
            dir.y += GRAVITY

        // update x, y position
        pos.add(dir)
    }

    draw(ctx){
        const { r, pos } = this

        ctx.fillStyle = this.fill.toString()
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }
}
