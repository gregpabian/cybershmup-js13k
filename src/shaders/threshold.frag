//#gljs varname: 'thresholdFrag', type: 'fragment'

precision mediump float;

uniform sampler2D t;

varying vec2 vuv;

void main() {
    vec3 c = texture2D(t, vuv).rgb;
    float b = dot(c, vec3(1, 1, 1));
    if (b > 0.65) {
      gl_FragColor = vec4(c, 1);
    } else {
      gl_FragColor = vec4(0, 0, 0, 1);
    }
}