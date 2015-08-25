attribute vec3 position;
attribute vec4 color;

#ifdef USE_TEXTURE
    attribute vec2 texture;
    varying vec2 vTextureCoord;

    #ifdef USE_TEXTURE_ENABLING
        attribute float textureEnable;
        varying float vTextureEnable;
    #endif
#endif

#ifdef USE_LIGHT
    uniform vec3 uAmbientLightColor;
    varying vec3 vLightWeighting;

    #if DIR_LIGHT_NUM > 0
        attribute vec3 normal;
        uniform vec3 uDirectionLightColors[DIR_LIGHT_NUM];
        uniform vec3 uDirectionLightPositions[DIR_LIGHT_NUM];
        uniform mat3 uNormalMatrix;
    #endif

    #ifdef USE_LIGHT_ENABLING
        attribute float lightEnable;
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

        #ifdef USE_TEXTURE_ENABLING
            vTextureEnable = textureEnable;
        #endif
    #endif

    #ifdef USE_LIGHT
        #ifdef USE_LIGHT_ENABLING
            if (lightEnable > 0.5) {
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
        #else
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
        #endif
    #endif
}
