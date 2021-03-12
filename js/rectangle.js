const WING_MULTIPLIER = 2,
      BACKGROUND_COLOR = 'rgb(255,255,255)';




// --------------------------------------------------------- rectangle

class Rectangle {
    constructor(x, y){
        // gestures
        this.origin = new Vec(x, y)
        this.last = this.origin
        this.wing = null
        this.lengths = []

        // actual rectangle vertices
        this.vertices = null
        this.edges = null
    }
    // internal
    defineVerticesAndEdges(){
        const { origin, last, wing } = this
        this.vertices = [
            origin.clone().add(wing),
            origin.clone().subtract(wing),
            last.clone().subtract(wing),
            last.clone().add(wing)
        ]
        const [ a, b, c, d ] = this.vertices
        this.edges = [
            [a, b],
            [b, c],
            [c, d],
            [d, a]
        ]
    }
    addGesture(x, y){
        this.lengths.push(
            euclideanDistance(x, y, this.last.x, this.last.y)
        );
        this.wing = new Vec(x, y).subtract(this.origin)
                                 .rotate(Math.PI / 2);

        this.wing.setLength(
            average(this.lengths) * WING_MULTIPLIER
        );
        this.last = new Vec(x, y)

        this.defineVerticesAndEdges()
    }
    toServer(){
        // send to server
        // rectangle width, height and rotation
        // using wing.length * 2
        // center point
        // and (last - origin).length &.angle 

        return {}
    }
    draw(ctx){
        // if vertices == null, user likely clicked without dragging
        if(this.vertices){
            const [ a, b, c, d ] = this.vertices

            ctx.fillStyle = BACKGROUND_COLOR
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.lineTo(c.x, c.y)
            ctx.lineTo(d.x, d.y)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        }
    }
}

