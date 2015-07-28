precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
    varying float vTextureAlpha;
#endif

varying vec4 vColor;

void main(void) {
    #ifdef USE_TEXTURE
        if (vTextureAlpha > 0.5) {
            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));

            gl_FragColor = vec4(textureColor.rgb * vColor.rgb, 1);
        } else {
            gl_FragColor = vColor;
        }
    #else
        gl_FragColor = vColor;
    #endif
}
