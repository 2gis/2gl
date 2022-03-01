export default `
precision mediump float;

#ifdef USE_TEXTURE
    uniform sampler2D uTexture;
    varying vec2 vTextureCoord;
    varying float vTextureEnable;
#endif

uniform float uColorAlpha;
varying vec3 vLightWeighting;
varying vec3 vColor;
varying vec3 vEmissive;

void main(void) {
    vec4 color = vec4(vColor.rgb, uColorAlpha);

    #ifdef USE_TEXTURE
        if (vTextureEnable > 0.5) {
            vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
            color = vec4(textureColor.rgb * color.rgb, color.a);
        }
    #endif

    gl_FragColor = vec4(color.rgb * vLightWeighting + vEmissive, color.a);
}
`;
