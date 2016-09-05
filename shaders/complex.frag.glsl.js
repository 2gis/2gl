"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nprecision mediump float;\n\n#ifdef USE_TEXTURE\n    uniform sampler2D uTexture;\n    varying vec2 vTextureCoord;\n    varying float vTextureEnable;\n#endif\n\nuniform float uColorAlpha;\nvarying vec3 vLightWeighting;\nvarying vec3 vColor;\nvarying vec3 vEmissive;\n\nvoid main(void) {\n    vec4 color = vec4(vColor.rgb, uColorAlpha);\n\n    #ifdef USE_TEXTURE\n        if (vTextureEnable > 0.5) {\n            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));\n            color = vec4(textureColor.rgb * color.rgb, color.a);\n        }\n    #endif\n\n    gl_FragColor = vec4(color.rgb * vLightWeighting + vEmissive, color.a);\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wbGV4LmZyYWcuZ2xzbC5qcyIsInNvdXJjZXNDb250ZW50IjpbXX0=