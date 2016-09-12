var baseVert = "attribute vec2 p;attribute vec2 uv;attribute vec4 c;varying vec2 vuv;varying vec4 vc;void main(){gl_Position=vec4(p,1,1);vuv=uv;vc=c;}\n";
var blurFrag = "precision mediump float;uniform sampler2D t;uniform vec2 d;varying vec2 vuv;void main(){vec2 a=vec2(480,640);vec2 b=vec2(1.385)*d/a;vec2 c=vec2(3.23)*d/a;gl_FragColor=texture2D(t,vuv)*0.22704+texture2D(t,vuv+b)*0.31621+texture2D(t,vuv-b)*0.31621+texture2D(t,vuv+c)*0.07027+texture2D(t,vuv-c)*0.07027;}\n";
var copyFrag = "precision mediump float;uniform sampler2D t;varying vec2 vuv;void main(){gl_FragColor=texture2D(t,vuv);}\n";
var mixFrag = "precision mediump float;uniform sampler2D m;uniform sampler2D b;uniform sampler2D t;varying vec2 vuv;void main(){vec4 a=texture2D(m,vuv)+texture2D(b,vuv)+texture2D(t,vuv)*0.5;gl_FragColor=vec4(vec3(1.0)-exp(-a.rgb*1.0),a.a);}\n";
var staticVert = "attribute vec2 p;varying vec2 vuv;void main(){gl_Position=vec4(p,1,1);vuv=0.5*(p+1.0);}\n";
var textureFrag = "precision mediump float;uniform sampler2D t;varying vec2 vuv;varying vec4 vc;void main(){vec4 a=texture2D(t,vuv);if(a.r==a.g&&a.g==a.b){gl_FragColor=a*vc;}else{gl_FragColor=a;}}\n";
var thresholdFrag = "precision mediump float;uniform sampler2D t;varying vec2 vuv;void main(){vec3 a=texture2D(t,vuv).rgb;float b=dot(a,vec3(1,1,1));if(b>0.65){gl_FragColor=vec4(a,1);}else{gl_FragColor=vec4(0,0,0,1);}}\n";
var trailFrag = "precision mediump float;uniform sampler2D t;uniform sampler2D o;varying vec2 vuv;void main(){gl_FragColor=texture2D(t,vuv)+texture2D(o,vuv)*0.6;}\n";
