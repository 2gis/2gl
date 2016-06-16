export default `
attribute vec2 position;
attribute vec2 texture;

uniform vec3 uPosition;
uniform mat4 uPCamera;
uniform vec2 uScale;
uniform vec2 uHalfSize;
uniform vec2 uOffset;
uniform float uSmoothing;

varying vec2 vTextureCoord;

void main(void) {
    vTextureCoord = texture;

    vec2 alignedPosition = position * uScale;
    alignedPosition += uOffset;
    alignedPosition /= uHalfSize;

    vec4 ndcPosition = uPCamera * vec4(uPosition, 1.0);
    ndcPosition.xyz = ndcPosition.xyz / ndcPosition.w;
    ndcPosition.w = 1.0;
    ndcPosition.xy += alignedPosition.xy;

    vec2 roundedPosition = floor((ndcPosition.xy + 1.0) * uHalfSize.xy + 0.5) / uHalfSize.xy - 1.0;
    vec2 roundingDelta = roundedPosition - ndcPosition.xy;

    ndcPosition.xy = ndcPosition.xy + roundingDelta * uSmoothing;

    gl_Position = ndcPosition;
}
`;
