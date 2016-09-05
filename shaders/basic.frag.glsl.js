"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nprecision mediump float;\n\nuniform float uColorAlpha;\nvarying vec3 vColor;\n\nvoid main(void) {\n    gl_FragColor = vec4(vColor.rgb, uColorAlpha);\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYXNpYy5mcmFnLmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6W119