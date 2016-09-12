//#gljs varname: 'baseVert', type: 'vertex'
attribute vec2 p;attribute vec2 uv;attribute vec4 c;varying vec2 vuv;varying vec4 vc;void main(){gl_Position=vec4(p,1,1);vuv=uv;vc=c;}
