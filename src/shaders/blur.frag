//#gljs varname: 'blurFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;
uniform vec2 dir;

varying vec2 v_uv;

void main() {
  vec2 off1 = vec2(1.385) * dir;
  vec2 off2 = vec2(3.23) * dir;
  vec2 dim = vec2(480, 640);
  vec4 color = texture2D(texture, v_uv) * 0.22704 +
    texture2D(texture, v_uv + (off1 / dim)) * 0.31621 +
    texture2D(texture, v_uv - (off1 / dim)) * 0.31621 +
    texture2D(texture, v_uv + (off2 / dim)) * 0.07027 +
    texture2D(texture, v_uv - (off2 / dim)) * 0.07027;
  gl_FragColor = color;
}
