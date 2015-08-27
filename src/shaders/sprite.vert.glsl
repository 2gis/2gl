attribute vec2 position;
attribute vec2 texture;

uniform mat4 uPosition;
uniform mat4 uPCamera;
uniform mat4 uWICamera;
uniform vec2 uScale;

varying vec2 vTextureCoord;

void main(void) {
    vTextureCoord = texture;

    vec2 alignedPosition = position * uScale;

    vec4 finalPosition = uWICamera * uPosition * vec4(0.0, 0.0, 0.0, 1.0);
    finalPosition.xy += alignedPosition.xy;
    finalPosition = uPCamera * finalPosition;

    gl_Position = finalPosition;
}
