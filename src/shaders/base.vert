//#gljs varname: 'baseVert', type: 'vertex'

attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec3 a_color;

varying vec2 v_uv;
varying vec3 v_color;

void main() {
  gl_Position = vec4(a_pos, 1, 1);
  v_uv = a_uv;
  v_color = a_color;
}
