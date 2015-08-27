// brfs module has error with import then using require
var fs = require('fs');
var path = require('path');

export default {
    basic: {
        vertex: fs.readFileSync(path.join(__dirname, '/basic.vert.glsl'), 'utf8'),
        fragment: fs.readFileSync(path.join(__dirname, '/basic.frag.glsl'), 'utf8')
    },
    complex: {
        vertex: fs.readFileSync(path.join(__dirname, '/complex.vert.glsl'), 'utf8'),
        fragment: fs.readFileSync(path.join(__dirname, '/complex.frag.glsl'), 'utf8')
    },
    sprite: {
        vertex: fs.readFileSync(path.join(__dirname, '/sprite.vert.glsl'), 'utf8'),
        fragment: fs.readFileSync(path.join(__dirname, '/sprite.frag.glsl'), 'utf8')
    }
};
