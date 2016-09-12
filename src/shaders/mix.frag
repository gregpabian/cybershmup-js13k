//#gljs varname: 'mixFrag', type: 'fragment'

precision mediump float;

uniform sampler2D base;
uniform sampler2D blur;
uniform sampler2D trail;

varying vec2 vuv;

void main() {
    vec4 color = texture2D(base, vuv) +  texture2D(blur, vuv) + texture2D(trail, vuv) * 0.5;
    gl_FragColor = vec4(vec3(1.0) - exp(-color.rgb * 1.0), color.a);
}