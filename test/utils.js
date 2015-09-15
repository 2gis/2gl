export function slice(typedArray) {
    return Array.prototype.slice.call(typedArray);
}

export function round(value, sign = 5) {
    return Math.round(value * Math.pow(10, sign)) / Math.pow(10, sign);
}


export let cubeVertices = [
    // front face
    -1, -1, -1,
    1, -1, -1,
    -1, -1, 1,
    1, -1, 1,
    -1, -1, 1,
    1, -1, -1,
    // back face
    -1, 1, -1,
    -1, 1, 1,
    1, 1, -1,
    1, 1, 1,
    1, 1, -1,
    -1, 1, 1,
    // bottom face
    -1, -1, -1,
    -1, 1, -1,
    1, -1, -1,
    1, 1, -1,
    1, -1, -1,
    -1, 1, -1,
    // top face
    -1, -1, 1,
    1, -1, 1,
    -1, 1, 1,
    1, 1, 1,
    -1, 1, 1,
    1, -1, 1,
    // left face
    -1, -1, -1,
    -1, -1, 1,
    -1, 1, -1,
    -1, 1, 1,
    -1, 1, -1,
    -1, -1, 1,
    // right face
    1, -1, -1,
    1, 1, -1,
    1, -1, 1,
    1, 1, 1,
    1, -1, 1,
    1, 1, -1
];
