//#gljs varname: 'copyFrag', type: 'fragment'
precision mediump float;uniform sampler2D t;varying vec2 vuv;void main(){gl_FragColor=texture2D(t,vuv);}