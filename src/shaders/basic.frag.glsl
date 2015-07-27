precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
#endif

varying vec4 vColor;

void main(void) {
    #ifdef USE_TEXTURE
        gl_FragColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
    #else
        gl_FragColor = vColor;
    #endif
}
