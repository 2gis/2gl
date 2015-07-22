exports.mapIndicesToVertices = function(vertices, indices) {
    var result = new Array(indices.length * 3);

    for (var i = 0; i < indices.length; i++) {
        var index = indices[i];

        result[i * 3]     = vertices[index * 3];
        result[i * 3 + 1] = vertices[index * 3 + 1];
        result[i * 3 + 2] = vertices[index * 3 + 2];
    }

    return result;
};
