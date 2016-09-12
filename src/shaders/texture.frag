//#gljs varname: 'textureFrag', type: 'fragment'

precision mediump float;

uniform sampler2D t;

varying vec2 vuv;
varying vec4 vc;

void main() {
  vec4 color = texture2D(t, vuv);
  if (color.r == color.g && color.g == color.b) {
    gl_FragColor = color * vc;
  } else {
    gl_FragColor = color;
  }
}
