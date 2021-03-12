// https://www.jeffreythompson.org/collision-detection/line-circle.php

function lineCircleCollision(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    if(euclideanDistance(x1,y1, cx,cy) <= r)
        return {x: x1, y: y1}
    if(euclideanDistance(x2,y2, cx,cy) <= r)
        return {x: x2, y: y2}

    // get length of the line
    const len = euclideanDistance(x1, y1, x2, y2)

    // get dot product of the line and circle
    const dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2)

    // find the closest point on the line
    const closestX = x1 + (dot * (x2-x1))
    const closestY = y1 + (dot * (y2-y1))


    // is point on segment?
    if ( !isPointOnLine(x1,y1,x2,y2, closestX, closestY) )
        return null;


    // get distance to closest point
    const distance = euclideanDistance( closestX, closestY, cx, cy )

    if (distance <= r)
        return {x: closestX, y: closestY}

    return null;

}



function isPointOnLine(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    const d1 = euclideanDistance(px,py, x1,y1)
    const d2 = euclideanDistance(px,py, x2,y2)

    // get the length of the line
    const lineLen = euclideanDistance(x1,y1, x2,y2)

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    const buffer = 0.1    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true
    }

    return false

}



