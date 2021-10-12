attribute vec2 texture;

attribute vec3 position;

attribute vec2 disposition;
attribute vec2 scale;
attribute vec2 offset;
attribute float colorAlpha;

uniform float uSmoothing;
uniform mat4 uPCamera;
uniform vec2 uHalfSize;

varying vec2 vTextureCoord;
varying float vColorAlpha;

void main() {
    vTextureCoord = texture;
    vColorAlpha = colorAlpha;

    vec4 anchor = uPCamera * vec4(position, 1.0);
    vec2 align = (disposition * scale + offset) / uHalfSize;
    vec2 pos_2d = anchor.xy + align.xy * anchor.w;

    vec2 round_pos = floor((pos_2d.xy + 1.0) * uHalfSize.xy + 0.5) / uHalfSize.xy - 1.0;
    vec2 round_delta = round_pos - pos_2d.xy;

    if (vColorAlpha == 0.0) {
        pos_2d = vec2(-2.0, -2.0);
    } else {
        pos_2d.xy = pos_2d.xy + round_delta * uSmoothing;
    }

    gl_Position = vec4(pos_2d, anchor.z, anchor.w);
}
