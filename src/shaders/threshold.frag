//#gljs varname: 'thresholdFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;

void main() {
    vec3 color = texture2D(texture, v_uv).rgb;
    float brightness = dot(color, vec3(1, 1, 1));

    if (brightness > 1.0) {
      gl_FragColor = vec4(color, 1);
    } else {
      gl_FragColor = vec4(0, 0, 0, 1);
    }
}