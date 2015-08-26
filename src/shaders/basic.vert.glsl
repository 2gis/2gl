attribute vec3 position;
attribute vec4 color;

uniform mat4 uPosition;
uniform mat4 uCamera;

varying vec4 vColor;

void main(void) {
    vColor = color;

    gl_Position = uCamera * uPosition * vec4(position, 1.0);
}
