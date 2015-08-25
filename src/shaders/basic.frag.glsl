precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;

    #ifdef USE_TEXTURE_ENABLING
        varying float vTextureEnable;
    #endif
#endif

#ifdef USE_LIGHT
    varying vec3 vLightWeighting;
#endif

uniform float uColorAlpha;
varying vec4 vColor;

void main(void) {
    vec4 color = vec4(vColor.rgb, vColor.a * uColorAlpha);

    #ifdef USE_TEXTURE
        #ifdef USE_TEXTURE_ENABLING
            if (vTextureEnable > 0.5) {
                vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
                color = vec4(textureColor.rgb * vColor.rgb, color.a);
            }
        #else
            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
            color = vec4(textureColor.rgb * vColor.rgb, color.a);
        #endif
    #endif

    #ifdef USE_LIGHT
        color = vec4(color.rgb * vLightWeighting, color.a);
    #endif

    gl_FragColor = color;
}
