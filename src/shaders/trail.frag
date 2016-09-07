//#gljs varname: 'trailFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;
uniform sampler2D old;

varying vec2 v_uv;

void main() {
  gl_FragColor = texture2D(texture, v_uv) + texture2D(old, v_uv) * 0.6;
}
