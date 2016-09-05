"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nprecision mediump float;\n\nuniform float uColorAlpha;\nuniform sampler2D uTexture;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));\n\n    gl_FragColor = textureColor * uColorAlpha;\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcHJpdGUuZnJhZy5nbHNsLmpzIiwic291cmNlc0NvbnRlbnQiOltdfQ==