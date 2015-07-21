attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVMatrix;

varying vec4 vColor;

void main(void) {
    gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;
}
