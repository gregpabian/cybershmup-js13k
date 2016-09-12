//#gljs varname: 'textureFrag', type: 'fragment'

precision mediump float;

uniform sampler2D t;

varying vec2 vuv;
varying vec4 vc;

void main() {
  vec4 c = texture2D(t, vuv);
  if (c.r == c.g && c.g == c.b) {
    gl_FragColor = c * vc;
  } else {
    gl_FragColor = c;
  }
}
