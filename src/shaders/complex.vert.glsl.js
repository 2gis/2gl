export default `
attribute vec3 position;
attribute vec3 color;
attribute vec3 emissive;

#ifdef USE_TEXTURE
    attribute vec2 texture;
    attribute float textureEnable;
    varying vec2 vTextureCoord;
    varying float vTextureEnable;
#endif

#if DIR_LIGHT_NUM > 0
    attribute vec3 normal;
    uniform vec3 uDirectionLightColors[DIR_LIGHT_NUM];
    uniform vec3 uDirectionLightPositions[DIR_LIGHT_NUM];
    uniform mat3 uNormalMatrix;
#endif

uniform mat4 uPosition;
uniform vec3 uAmbientLightColor;
uniform mat4 uCamera;

varying vec3 vColor;
varying vec3 vEmissive;
varying vec3 vLightWeighting;

void main(void) {
    vColor = color;
    vEmissive = emissive;

    #ifdef USE_TEXTURE
        vTextureCoord = texture;
        vTextureEnable = textureEnable;
    #endif

    vec3 vLightTemp = vec3(0.0);

    #if DIR_LIGHT_NUM > 0
        vec3 transformedNormal = uNormalMatrix * normal;

        for(int i = 0; i < DIR_LIGHT_NUM; i++) {
            float dotProduct = dot(transformedNormal, uDirectionLightPositions[i]);
            vec3 directionalLightWeighting = vec3(max(dotProduct, 0.0));
            vLightTemp += uDirectionLightColors[i] * directionalLightWeighting;
        }
    #endif

    vLightWeighting = uAmbientLightColor + vLightTemp;

    gl_Position = uCamera * uPosition * vec4(position, 1.0);
}
`;
