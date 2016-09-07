//#gljs varname: 'mixFrag', type: 'fragment'

precision mediump float;

uniform sampler2D base;
uniform sampler2D blur;
uniform sampler2D trail;

varying vec2 v_uv;

void main() {
    vec4 color = texture2D(base, v_uv);
    vec4 bloom = texture2D(blur, v_uv);
    vec4 trailColor = texture2D(trail, v_uv);
    // additive blending
    color += trailColor;
    color += bloom * 0.5;
    // tone mapping
    vec4 result = vec4(vec3(1.0) - exp(-color.rgb * 1.0), color.a);
    gl_FragColor = result;
}