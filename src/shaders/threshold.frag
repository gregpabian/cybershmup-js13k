//#gljs varname: 'thresholdFrag', type: 'fragment'

precision mediump float;

uniform sampler2D texture;

varying vec2 v_uv;

void main() {
    vec3 color = texture2D(texture, v_uv).rgb;
    float brightness = dot(color, vec3(0.2126, 0.7152, 0.0722));

    if (brightness > 0.5) {
      gl_FragColor = vec4(color, 1);
    } else {
      gl_FragColor = vec4(0, 0, 0, 1);
    }
}