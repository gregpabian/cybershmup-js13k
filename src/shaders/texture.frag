//#gljs varname: 'textureFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;
varying vec3 v_color;

void main() {
  vec4 color = texture2D(texture, v_uv);
  gl_FragColor = vec4(color.rgb * v_color * color.a, color.a);
}
