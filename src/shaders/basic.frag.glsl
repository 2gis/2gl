precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
    varying float vTextureAlpha;
#endif

#ifdef USE_LIGHT
    varying vec3 vLightWeighting;
#endif

varying vec4 vColor;

void main(void) {
    vec4 color = vColor;

    #ifdef USE_TEXTURE
        if (vTextureAlpha > 0.5) {
            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));

            color = vec4(textureColor.rgb * vColor.rgb, 1);
        }
    #endif

    #ifdef USE_LIGHT
        color = vec4(color.rgb * vLightWeighting, color.a);
    #endif

    gl_FragColor = color;
}
