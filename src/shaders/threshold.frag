//#gljs varname: 'thresholdFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;

void main() {
    vec3 c = texture2D(texture, v_uv).rgb;
    float b = dot(c, vec3(1, 1, 1));
    if (b > 0.65) {
      gl_FragColor = vec4(c, 1);
    } else {
      gl_FragColor = vec4(0, 0, 0, 1);
    }
}