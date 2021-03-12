// -------------------------------------------------------------- math

function euclideanDistance(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// takes an array of numbers
function average(arr) {
    return arr.reduce((a, b) => (a + b)) / arr.length;
}


function random(min, max) {
    return (Math.random() * (max - min)) + min;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomGaussian(mean, sd){
    let y1, x1, x2, w;
    do {
        x1 = (Math.random() * 2) - 1;
        x2 = (Math.random() * 2) - 1;
        w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    y1 = x1 * w;
    const m = mean || 0;
    const s = sd || 1;
    return y1 * s + m;
}