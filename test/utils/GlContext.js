/* eslint-disable no-var */
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

    this.TEXTURE_2D = 10;
    this.UNPACK_FLIP_Y_WEBGL = 11;
    this.RGBA = 12;
    this.UNSIGNED_BYTE = 13;
    this.TEXTURE_WRAP_S = 14;
    this.TEXTURE_WRAP_T = 15;
    this.TEXTURE_MAG_FILTER = 16;
    this.TEXTURE_MIN_FILTER = 17;
    this.CLAMP_TO_EDGE = 18;
    this.NEAREST = 19;
    this.NEAREST_MIPMAP_NEAREST = 20;
    this.NEAREST_MIPMAP_LINEAR = 21;
    this.LINEAR = 22;
    this.LINEAR_MIPMAP_NEAREST = 23;
    this.LINEAR_MIPMAP_LINEAR = 24;

    this.COLOR_BUFFER_BIT = 25;
    this.DEPTH_BUFFER_BIT = 26;
    this.DEPTH_TEST = 27;
    this.LEQUAL = 28;
    this.CCW = 29;
    this.BACK = 30;
    this.CULL_FACE = 31;
    this.BLEND = 32;

    this.FRAMEBUFFER = 33;
    this.RENDERBUFFER = 34;
    this.DEPTH_COMPONENT16 = 35;
    this.COLOR_ATTACHMENT0 = 36;
    this.DEPTH_ATTACHMENT = 37;
    this.FRAMEBUFFER_COMPLETE = 38;
    this.FRAMEBUFFER_UNSUPPORTED = 39;
    this.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 40;
    this.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 41;
    this.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 42;
}

GlContext.prototype.viewport = function() {};
GlContext.prototype.clearColor = function() {};
GlContext.prototype.clear = function() {};
GlContext.prototype.clearDepth = function() {};
GlContext.prototype.clearStencil = function() {};
GlContext.prototype.enable = function() {};
GlContext.prototype.disable = function() {};
GlContext.prototype.depthFunc = function() {};
GlContext.prototype.frontFace = function() {};
GlContext.prototype.cullFace = function() {};
GlContext.prototype.blendEquation = function() {};
GlContext.prototype.blendFunc = function() {};
GlContext.prototype.blendEquationSeparate = function() {};
GlContext.prototype.blendFuncSeparate = function() {};
GlContext.prototype.readPixels = function() {};

GlContext.prototype.createBuffer = function() {
    return {};
};

GlContext.prototype.bindBuffer = function() {};
GlContext.prototype.bufferData = function() {};
GlContext.prototype.bufferSubData = function() {};
GlContext.prototype.vertexAttribPointer = function() {};
GlContext.prototype.deleteBuffer = function() {};

GlContext.prototype.createFramebuffer = function() {
    return {};
};
GlContext.prototype.bindFramebuffer = function() {};
GlContext.prototype.framebufferTexture2D = function() {};
GlContext.prototype.createRenderbuffer = function() {
    return {};
};
GlContext.prototype.bindRenderbuffer = function() {};
GlContext.prototype.renderbufferStorage = function() {};
GlContext.prototype.framebufferRenderbuffer = function() {};
GlContext.prototype.checkFramebufferStatus = function() {
    return this.FRAMEBUFFER_COMPLETE;
};

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
GlContext.prototype.uniform2f = function() {};
GlContext.prototype.uniform3f = function() {};
GlContext.prototype.uniform1i = function() {};
GlContext.prototype.uniform2i = function() {};
GlContext.prototype.uniform3i = function() {};
GlContext.prototype.uniform3fv = function() {};

GlContext.prototype.drawArrays = function() {};
GlContext.prototype.drawElements = function() {};

GlContext.prototype.createTexture = function() {
    return {};
};
GlContext.prototype.bindTexture = function() {};
GlContext.prototype.activeTexture = function() {};
GlContext.prototype.pixelStorei = function() {};
GlContext.prototype.texImage2D = function() {};
GlContext.prototype.texParameteri = function() {};
GlContext.prototype.generateMipmap = function() {};

module.exports = GlContext;
/* eslint-enable no-var */
