//#gljs varname: 'textureFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;
varying vec4 v_color;

void main() {
  vec4 color = texture2D(texture, v_uv);
  if (color.r == color.g && color.g == color.b) {
    gl_FragColor = color * v_color;
  } else {
    gl_FragColor = color;
  }
}
