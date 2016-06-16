export default `
precision mediump float;

uniform float uColorAlpha;
varying vec3 vColor;

void main(void) {
    gl_FragColor = vec4(vColor.rgb, uColorAlpha);
}
`;
