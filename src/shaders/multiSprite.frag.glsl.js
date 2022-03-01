export default `
precision mediump float;

uniform sampler2D uTexture;

varying vec2 vTextureCoord;
varying float vColorAlpha;

void main(void) {
    vec4 textureColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));

    gl_FragColor = textureColor * vColorAlpha;
}
`;
