function GlContext() {
    this.ARRAY_BUFFER = 1;
    this.ELEMENT_ARRAY_BUFFER = 2;
    this.FLOAT = 3;
    this.STATIC_DRAW = 4;
}

GlContext.prototype.createBuffer = function() {
    return {};
};

GlContext.prototype.bindBuffer = function() {};
GlContext.prototype.bufferData = function() {};
GlContext.prototype.vertexAttribPointer = function() {};
GlContext.prototype.deleteBuffer = function() {};

module.exports = GlContext;
