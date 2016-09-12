//#gljs varname: 'trailFrag', type: 'fragment'

precision mediump float;

uniform sampler2D t;
uniform sampler2D old;

varying vec2 vuv;

void main() {
  gl_FragColor = texture2D(t, vuv) + texture2D(old, vuv) * 0.6;
}
