// ------------------------------------------------------------ vector


class Point {
    constructor(x,y){
        this.x = x
        this.y = y
    }
    round(){
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
    }
    obj(){
        return { x: this.x, y: this.y }
    }
}


class Vec extends Point {

    clone(){
        return new Vec(this.x, this.y)
    }

    invertX(){
        this.x *= -1
    }

    invertY(){
        this.y *= -1
    }

    // assumes angle in radians
    rotate(angle){
        const {x, y} = this
        this.x = (x * Math.cos(angle)) - (y * Math.sin(angle))
        this.y = (x * Math.sin(angle)) + (y * Math.cos(angle))
        return this // chainable
    }

    add(vec){
        this.x += vec.x
        this.y += vec.y
        return this
    }

    subtract(vec){
        this.x -= vec.x
        this.y -= vec.y
        return this
    }

    // get horizontal angle in radians
    angle(){
        return Math.atan2(this.y, this.x)
    }

    // get length
    length(){
        return Math.sqrt(this.x ** 2  + this.y ** 2)
    }

    setLength(scalar) {
        const length = this.length()
        if (scalar >= 0 && length !== 0) {
            const sinA = this.y / length
            const sinB = this.x / length
            this.y = sinA * scalar
            this.x = sinB * scalar
        }
        return this
    }

    // should probably rename
    limit(max, factor){
        // Math.abs not really used
        if (Math.abs(this.x) > max) this.x *= factor 
        if (Math.abs(this.y) > max) this.y *= factor
        return this
    }

}