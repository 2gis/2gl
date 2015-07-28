precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
    varying float vTextureAlpha;
#endif

varying vec4 vColor;
varying vec3 vLightWeighting;

void main(void) {
    vec4 color;

    #ifdef USE_TEXTURE
        if (vTextureAlpha > 0.5) {
            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));

            color = vec4(textureColor.rgb * vColor.rgb, 1);
        } else {
            color = vColor;
        }
    #else
        color = vColor;
    #endif

    color = vec4(color.rgb * vLightWeighting, color.a);

    gl_FragColor = color;
}
