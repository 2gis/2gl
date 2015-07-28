attribute vec3 position;
attribute vec4 color;

#ifdef USE_TEXTURE
    attribute vec2 texture;
    attribute float textureAlpha;
    varying vec2 vTextureCoord;
    varying float vTextureAlpha;
#endif

uniform mat4 uPosition;
uniform mat4 uCamera;
uniform vec3 uAmbientLightColor;

varying vec4 vColor;
varying vec3 vLightWeighting;

void main(void) {
    gl_Position = uCamera * uPosition * vec4(position, 1.0);
    vColor = color;

    #ifdef USE_TEXTURE
        vTextureCoord = texture;
        vTextureAlpha = textureAlpha;
    #endif

    vLightWeighting = uAmbientLightColor;
}
