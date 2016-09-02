/* global Stats width height ctx ctxUI performance clicked: true scenes gl
currentScene: true isMobile handleKeys wrapper sc: true disableAA makeProgram
baseVert staticVert textureFrag blurFrag mixFrag makeFramebuffer setFramebuffer
*/

var last = 0;
var dt = 0;
var sw = 0;
var sh = 0;
var lastResize = 0;

var drawProgram;
var blurProgram;
var mainProgram;
var baseFBO;
var tmpFBO1;
var tmpFBO2;

function loop(now) {
  /* dev */
  stats.begin();
  /* end-dev */
  dt = Math.min(now - last, 100);
	last = now;

	checkResize();

  if (!isMobile) handleKeys();
  // handle controls
  scenes[currentScene][2]();
  // update scene
  scenes[currentScene][1]();
  // render scene
  render();
  /* dev */
  stats.end();
  /* end-dev */
  requestAnimationFrame(loop);
}

function checkResize() {
  var now = performance.now();

  if (now - lastResize > 250) {
    lastResize = now;

    var ww = window.innerWidth;
    var wh = window.innerHeight;

    if (ww !== sw || wh !== sh) {
      sw = ww;
      sh = wh;

      resize(sw, sh);
    }
  }
}

function render() {
  ctxUI.clearRect(0, 0, width, height);

  setFramebuffer(null);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // render scene
  scenes[currentScene][3]();
}

function initGL() {
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 1);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

  drawProgram = makeProgram(baseVert, textureFrag, ['a_pos', 'a_uv', 'a_color']);
  blurProgram = makeProgram(staticVert, blurFrag, ['a_pos']);
  mainProgram = makeProgram(staticVert, mixFrag, ['a_pos']);

  baseFBO = makeFramebuffer();
  tmpFBO1 = makeFramebuffer();
  tmpFBO2 = makeFramebuffer();
}

function changeScene(id) {
  currentScene = id;
  // initialize scene
  scenes[currentScene][0].apply(null, Array.prototype.slice.call(arguments, 1));
}

function resize(ww, wh) {
  sc = Math.min(1 / Math.max(width / ww, height / wh), 1);

  wrapper.style.webkitTransform = 'scale(' + (sc) + ')';
  wrapper.style.top = ~~((wh - (height * sc)) / 2) + 'px';
  wrapper.style.left = ~~((ww - (width * sc)) / 2) + 'px';
}

/* dev */
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
/* end-dev */

// disable antialiasing
disableAA(ctxUI);

resize(window.innerWidth, window.innerHeight);

initGL();

changeScene(currentScene);

requestAnimationFrame(loop);
