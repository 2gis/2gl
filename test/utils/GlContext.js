function GlContext() {
    this.ARRAY_BUFFER = 1;
    this.ELEMENT_ARRAY_BUFFER = 2;
    this.FLOAT = 3;
    this.STATIC_DRAW = 4;

    this.FRAGMENT_SHADER = 5;
    this.COMPILE_STATUS = 6;
    this.VERTEX_SHADER = 7;
    this.LINK_STATUS = 8;

    this.TRIANGLES = 9;
}

GlContext.prototype.createBuffer = function() {
    return {};
};

GlContext.prototype.bindBuffer = function() {};
GlContext.prototype.bufferData = function() {};
GlContext.prototype.vertexAttribPointer = function() {};
GlContext.prototype.deleteBuffer = function() {};

GlContext.prototype.useProgram = function() {};
GlContext.prototype.enableVertexAttribArray = function() {};
GlContext.prototype.createShader = function() {
    return {};
};
GlContext.prototype.shaderSource = function() {};
GlContext.prototype.compileShader = function() {};
GlContext.prototype.getShaderParameter = function() {
    return true;
};
GlContext.prototype.getShaderInfoLog = function() {};
GlContext.prototype.createProgram = function() {
    return {};
};
GlContext.prototype.attachShader = function() {};
GlContext.prototype.linkProgram = function() {};
GlContext.prototype.getProgramParameter = function() {
    return true;
};
GlContext.prototype.disableVertexAttribArray = function() {};

var attribCount = 0;
GlContext.prototype.getAttribLocation = function() {
    return attribCount++;
};

var uniformCount = 0;
GlContext.prototype.getUniformLocation = function() {
    return uniformCount++;
};

GlContext.prototype.uniformMatrix4fv = function() {};
GlContext.prototype.uniform1f = function() {};
GlContext.prototype.uniform3fv = function() {};

GlContext.prototype.drawArrays = function() {};

module.exports = GlContext;
