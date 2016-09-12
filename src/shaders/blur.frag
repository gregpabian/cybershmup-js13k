//#gljs varname: 'blurFrag', type: 'fragment'

precision mediump float;

uniform sampler2D t;
uniform vec2 d;

varying vec2 vuv;

void main() {
  vec2 s = vec2(480, 640);
  vec2 o1 = vec2(1.385) * d / s;
  vec2 o2 = vec2(3.23) * d / s;
  gl_FragColor = texture2D(t, vuv) * 0.22704 +
    texture2D(t, vuv + o1) * 0.31621 +
    texture2D(t, vuv - o1) * 0.31621 +
    texture2D(t, vuv + o2) * 0.07027 +
    texture2D(t, vuv - o2) * 0.07027;
}
