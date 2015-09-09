export function clamp(x, a, b) {
    return (x < a) ? a : ((x > b) ? b : x);
}

export function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
