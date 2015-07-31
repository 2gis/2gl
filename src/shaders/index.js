// brfs module has error with import then using require
var fs = require('fs');
var path = require('path');

export default {
    basic: {
        vertex: fs.readFileSync(path.join(__dirname, '/basic.vert.glsl'), 'utf8'),
        fragment: fs.readFileSync(path.join(__dirname, '/basic.frag.glsl'), 'utf8')
    }
};
