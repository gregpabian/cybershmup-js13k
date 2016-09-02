//#gljs varname: 'textureFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;
varying vec4 v_color;

void main() {
  vec4 color = texture2D(texture, v_uv);
  gl_FragColor = color * v_color;
}
