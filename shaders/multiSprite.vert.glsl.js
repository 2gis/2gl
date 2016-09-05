"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\nattribute vec2 disposition;\nattribute vec2 texture;\n\nattribute vec3 position;\nattribute vec2 scale;\nattribute vec2 offset;\nattribute float colorAlpha;\n\nuniform float uSmoothing;\nuniform mat4 uPCamera;\nuniform vec2 uHalfSize;\n\nvarying vec2 vTextureCoord;\nvarying float vColorAlpha;\n\nvoid main(void) {\n    vTextureCoord = texture;\n    vColorAlpha = colorAlpha;\n\n    vec2 alignedPosition = disposition * scale;\n    alignedPosition += offset;\n    alignedPosition /= uHalfSize;\n\n    vec4 ndcPosition = uPCamera * vec4(position, 1.0);\n    ndcPosition.xyz = ndcPosition.xyz / ndcPosition.w;\n    ndcPosition.w = 1.0;\n    ndcPosition.xy += alignedPosition.xy;\n\n    vec2 roundedPosition = floor((ndcPosition.xy + 1.0) * uHalfSize.xy + 0.5) / uHalfSize.xy - 1.0;\n    vec2 roundingDelta = roundedPosition - ndcPosition.xy;\n\n    if (vColorAlpha == 0.0) {\n        ndcPosition.xy = vec2(-2.0, -2.0);\n    } else {\n        ndcPosition.xy = ndcPosition.xy + roundingDelta * uSmoothing;\n    }\n\n    gl_Position = ndcPosition;\n}\n";
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtdWx0aVNwcml0ZS52ZXJ0Lmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6W119