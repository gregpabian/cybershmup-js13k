//#gljs varname: 'staticVert', type: 'vertex'

attribute vec2 a_pos;

varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_pos, 1, 1);
  v_uv = 0.5 * (a_pos + 1.0);
}
