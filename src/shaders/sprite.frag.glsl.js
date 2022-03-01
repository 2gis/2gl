export default `
precision mediump float;

uniform float uColorAlpha;
uniform sampler2D uTexture;

varying vec2 vTextureCoord;

void main(void) {
    vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));

    gl_FragColor = textureColor * uColorAlpha;
}
`;
