attribute vec3 position;

uniform mat4 uPosition;
uniform mat4 uCamera;
uniform vec4 uColor;
uniform vec4 uEmissive;

varying vec4 vColor;
varying vec4 vEmissive;

void main(void) {
    vColor = uColor;
    vEmissive = uEmissive;

    gl_Position = uCamera * uPosition * vec4(position, 1.0);
}
