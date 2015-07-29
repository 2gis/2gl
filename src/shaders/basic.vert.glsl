attribute vec3 position;
attribute vec4 color;

#ifdef USE_TEXTURE
    attribute vec2 texture;
    attribute float textureAlpha;

    varying vec2 vTextureCoord;
    varying float vTextureAlpha;
#endif

#ifdef USE_LIGHT
    attribute float directionLightAlpha;
    uniform vec3 uAmbientLightColor;
    varying vec3 vLightWeighting;

    #if DIR_LIGHT_NUM > 0
        attribute vec3 normal;
        uniform vec3 uDirectionLightColors[DIR_LIGHT_NUM];
        uniform vec3 uDirectionLightPositions[DIR_LIGHT_NUM];
        uniform mat3 uNormalMatrix;
    #endif
#endif

uniform mat4 uPosition;
uniform mat4 uCamera;

varying vec4 vColor;

void main(void) {
    gl_Position = uCamera * uPosition * vec4(position, 1.0);

    vColor = color;

    #ifdef USE_TEXTURE
        vTextureCoord = texture;
        vTextureAlpha = textureAlpha;
    #endif

    #ifdef USE_LIGHT
        if (directionLightAlpha > 0.5) {
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
        } else {
            vLightWeighting = vec3(1.0);
        }
    #endif
}
