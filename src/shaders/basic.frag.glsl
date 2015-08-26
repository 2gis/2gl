precision mediump float;

uniform float uColorAlpha;
varying vec4 vColor;

void main(void) {
    vec4 color = vec4(vColor.rgb, vColor.a * uColorAlpha);

    gl_FragColor = color;
}
