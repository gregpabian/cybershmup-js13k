//#gljs varname: 'mixFrag', type: 'fragment'

precision mediump float;

uniform sampler2D base;
uniform sampler2D blur;

varying vec2 v_uv;

void main() {
    vec4 color = texture2D(base, v_uv);
    vec4 bloom = texture2D(blur, v_uv);
    gl_FragColor = color + bloom;
}