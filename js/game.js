
// ----------------------------------------------------------- globals

let canvii,
    mouseDown,
    currRectangle,
    circles,
    rectangles;




// ---------------------------------------------------------- gestures

window.addEventListener('resize', e => {
    canvii = setup();
});

window.addEventListener('mousedown', e => {
    currRectangle = new Rectangle(e.clientX, e.clientY);
    mouseDown = true;
});

window.addEventListener('mouseup', e => {
    const ctx = canvii.gestures
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    mouseDown = false
    if(currRectangle.vertices !== null){
        rectangles.push(currRectangle)
        redrawRectangles()
    }
    currRectangle = null;
});

window.addEventListener('mousemove', e => {
    if(mouseDown){
        const ctx = canvii.gestures
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        currRectangle.addGesture(e.clientX, e.clientY)
        currRectangle.draw(ctx)
    }
});

window.addEventListener('keyup', e => {
    let circle = new Circle(window.innerWidth / 2, window.innerHeight / 2)
    circles.push(circle)
});




// -------------------------------------------------------------- init

// get canvas context as global variable
canvii = setup()

// begin draw loop
drawCircles()

// sets up canvas drawing in DOM
// sets resolution
// returns the canvas ctx
function setup(){

    mouseDown = false
    circles = []
    rectangles = []
    currRectangle = null

    const width = window.innerWidth,
          height = window.innerHeight,
          pixels = window.devicePixelRatio;

    // returns an object
    // whose keys are listed below as strings in the array
    return [
        'rectangles',
        'circles',
        'gestures',
        'particles'
    ].reduce((obj, id) => {
        canvas = document.getElementById(id)

        // retina screens
        if(id != 'particles'){
            canvas.width = width * pixels
            canvas.height = height * pixels
        }else{
            canvas.width = width
            canvas.height = height
        }

        let ctx
        // alpha maybe only used particles
        // setting alpha to false may speed things up in some browsers
        // if(id != 'particles')
        //     ctx = canvas.getContext('2d', { alpha: false })
        // else
        ctx = canvas.getContext('2d')

        if(id != 'particles'){
            ctx.scale(pixels, pixels)
        }

        console.log(ctx)
        obj[id] = ctx

        return obj
    }, {})

}




// ---------------------------------------------------- animation loop

function redrawRectangles(){
    ctx = canvii.rectangles
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // rectangles should be drawn in order
    for(let i=0; i<rectangles.length; i++){
        rectangles[i].draw(ctx)
    }
}

function drawCircles(){

    // redraw background with transparent background
    const ctx = canvii.circles
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for(let c = circles.length - 1; c >= 0; c--){
        circles[c].move()
        circles[c].draw(ctx)
        for(let r = rectangles.length - 1; r >= 0; r--){
            const { edges } = rectangles[r]
            for(let e=0; e<edges.length; e++){
                if(collision(edges[e], circles[c])){

                    const angle = edges[e][1].clone().subtract(edges[e][0]).angle()
                    const angleDiff = angle - circles[c].dir.angle()
                    circles[c].dir.rotate(angleDiff * 2)
                    explodeRectangle(rectangles[r].edges, canvii.particles)

                    rectangles.splice(r, 1)
                    redrawRectangles()
                    break
                }
            }
        }
    }

    requestAnimationFrame(drawCircles);
}




// -------------------------------------------------------- collisions

// https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
// https://stackoverflow.com/questions/10957689/collision-detection-between-a-line-and-a-circle-in-javascript

function collision(line, circle){
    let point = lineCircleCollision(
        line[0].x, line[0].y,
        line[1].x, line[1].y,
        circle.pos.x, circle.pos.y, RADII
    );

    // if(point)
    //     explodeParticles(point, canvii.particles);
    if(point === null) return false
    return true
}





