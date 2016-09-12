//#gljs varname: 'staticVert', type: 'vertex'
attribute vec2 p;varying vec2 vuv;void main(){gl_Position=vec4(p,1,1);vuv=0.5*(p+1.0);}