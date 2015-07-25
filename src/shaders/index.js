// brfs module has error with import then using require
let fs = require('fs');

export default {
    basic: {
        vertex: fs.readFileSync(__dirname + '/basic.vert.glsl', 'utf8'),
        fragment: fs.readFileSync(__dirname + '/basic.frag.glsl', 'utf8')
    }
};
