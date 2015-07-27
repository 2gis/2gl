attribute vec3 position;
attribute vec4 color;

#ifdef USE_TEXTURE
    attribute vec2 texture;
    varying vec2 vTextureCoord;
#endif

uniform mat4 uPosition;
uniform mat4 uCamera;

varying vec4 vColor;

void main(void) {
    gl_Position = uCamera * uPosition * vec4(position, 1.0);
    vColor = color;

    #ifdef USE_TEXTURE
        vTextureCoord = texture;
    #endif
}
