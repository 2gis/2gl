"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nprecision mediump float;\n\nuniform sampler2D uTexture;\n\nvarying vec2 vTextureCoord;\nvarying float vColorAlpha;\n\nvoid main(void) {\n    vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));\n\n    gl_FragColor = textureColor * vColorAlpha;\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtdWx0aVNwcml0ZS5mcmFnLmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6W119