"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nattribute vec2 position;\nattribute vec2 texture;\n\nuniform vec3 uPosition;\nuniform mat4 uPCamera;\nuniform vec2 uScale;\nuniform vec2 uHalfSize;\nuniform vec2 uOffset;\nuniform float uSmoothing;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    vTextureCoord = texture;\n\n    vec2 alignedPosition = position * uScale;\n    alignedPosition += uOffset;\n    alignedPosition /= uHalfSize;\n\n    vec4 ndcPosition = uPCamera * vec4(uPosition, 1.0);\n    ndcPosition.xyz = ndcPosition.xyz / ndcPosition.w;\n    ndcPosition.w = 1.0;\n    ndcPosition.xy += alignedPosition.xy;\n\n    vec2 roundedPosition = floor((ndcPosition.xy + 1.0) * uHalfSize.xy + 0.5) / uHalfSize.xy - 1.0;\n    vec2 roundingDelta = roundedPosition - ndcPosition.xy;\n\n    ndcPosition.xy = ndcPosition.xy + roundingDelta * uSmoothing;\n\n    gl_Position = ndcPosition;\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcHJpdGUudmVydC5nbHNsLmpzIiwic291cmNlc0NvbnRlbnQiOltdfQ==