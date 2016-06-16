export default `
attribute vec2 disposition;
attribute vec2 texture;

attribute vec3 position;
attribute vec2 scale;
attribute vec2 offset;
attribute float colorAlpha;

uniform float uSmoothing;
uniform mat4 uPCamera;
uniform vec2 uHalfSize;

varying vec2 vTextureCoord;
varying float vColorAlpha;

void main(void) {
    vTextureCoord = texture;
    vColorAlpha = colorAlpha;

    vec2 alignedPosition = disposition * scale;
    alignedPosition += offset;
    alignedPosition /= uHalfSize;

    vec4 ndcPosition = uPCamera * vec4(position, 1.0);
    ndcPosition.xyz = ndcPosition.xyz / ndcPosition.w;
    ndcPosition.w = 1.0;
    ndcPosition.xy += alignedPosition.xy;

    vec2 roundedPosition = floor((ndcPosition.xy + 1.0) * uHalfSize.xy + 0.5) / uHalfSize.xy - 1.0;
    vec2 roundingDelta = roundedPosition - ndcPosition.xy;

    if (vColorAlpha == 0.0) {
        ndcPosition.xy = vec2(-2.0, -2.0);
    } else {
        ndcPosition.xy = ndcPosition.xy + roundingDelta * uSmoothing;
    }

    gl_Position = ndcPosition;
}
`;
