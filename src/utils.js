exports.mapIndicesToVertices = function(vertices, indices) {
    let result = new Array(indices.length * 3);

    for (let i = 0; i < indices.length; i++) {
        let index = indices[i];

        result[i * 3]     = vertices[index * 3];
        result[i * 3 + 1] = vertices[index * 3 + 1];
        result[i * 3 + 2] = vertices[index * 3 + 2];
    }

    return result;
};
