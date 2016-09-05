"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nattribute vec3 position;\n\nuniform mat4 uPosition;\nuniform mat4 uCamera;\nuniform vec3 uColor;\nuniform vec3 uEmissive;\n\nvarying vec3 vColor;\n\nvoid main(void) {\n    vColor = uColor;\n\n    gl_Position = uCamera * uPosition * vec4(position, 1.0);\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYXNpYy52ZXJ0Lmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6W119