//#gljs varname: 'mixFrag', type: 'fragment'

precision mediump float;

uniform sampler2D base;
uniform sampler2D blur;
uniform sampler2D trail;

varying vec2 v_uv;

void main() {
    vec3 color = texture2D(base, v_uv).rgb;
    vec3 bloom = texture2D(blur, v_uv).rgb;
    vec3 trailColor = texture2D(trail, v_uv).rgb;
    // additive blending
    color += trailColor;
    color += bloom;
    // tone mapping
    vec3 result = vec3(1.0) - exp(-color * 1.0);
    gl_FragColor = vec4(result, 1.0);
}