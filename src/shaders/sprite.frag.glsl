precision mediump float;

uniform float uColorAlpha;
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {
    vec4 color = vec4(0.5, 1, 1, uColorAlpha);

    vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
    color = vec4(textureColor.rgb * color.rgb, color.a);

    gl_FragColor = color;
}
