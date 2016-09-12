//#gljs varname: 'mixFrag', type: 'fragment'

precision mediump float;

uniform sampler2D m;
uniform sampler2D b;
uniform sampler2D t;

varying vec2 vuv;

void main() {
    vec4 c = texture2D(m, vuv) +  texture2D(b, vuv) + texture2D(t, vuv) * 0.5;
    gl_FragColor = vec4(vec3(1.0) - exp(-c.rgb * 1.0), c.a);
}