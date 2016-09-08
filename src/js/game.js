/* global Stats width height ctxUI performance scenes gl useProgram thresholdFrag
currentScene: true isMobile handleKeys wrapper sc: true disableAA makeProgram
baseVert staticVert textureFrag blurFrag mixFrag makeFramebuffer setFramebuffer
highQuality getUniformLocation useTexture makeQuadBuffer drawBackground cm
copyFrag trailFrag cancelAnimationFrame loaded projectionMatrix TWO_PI */

var last = 0;
var dt = 0;
var sw = 0;
var sh = 0;
var lastResize = 0;
var sx = 0;
var sy = 0;
var sa = 0;
var sr = 0;

var drawProgram;
var thresholdProgram;
var copyProgram;
var trailProgram;
var blurProgram;
var mainProgram;
var baseFBO;
var copyFBO;
var tmpFBO1;
var tmpFBO2;
var trailFBO;
var quadBuffer;

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
  // update camera
  updateCamera();
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

  setFramebuffer(highQuality ? baseFBO : null);

  gl.clear(gl.COLOR_BUFFER_BIT);

  if (loaded) drawBackground(scenes[currentScene][4]);

  // render scene
  scenes[currentScene][3]();

  if (!highQuality || !loaded) return;
  // do the post-processing
  // setFramebuffer(copyFBO);

  // apply threshold
  setFramebuffer(tmpFBO2);

  useProgram(thresholdProgram);
  gl.uniform1i(getUniformLocation(thresholdProgram, 'texture'), useTexture(baseFBO[1], 0));

  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.vertexAttribPointer(thresholdProgram['a_pos'], 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // blur 1
  setFramebuffer(tmpFBO1);

  useProgram(blurProgram);
  gl.uniform1i(getUniformLocation(blurProgram, 'texture'), useTexture(tmpFBO2[1], 0));
  gl.uniform2f(getUniformLocation(blurProgram, 'dir'), 1, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // blur 2
  setFramebuffer(tmpFBO2);

  gl.uniform1i(getUniformLocation(blurProgram, 'texture'), useTexture(tmpFBO1[1], 0));
  gl.uniform2f(getUniformLocation(blurProgram, 'dir'), -1, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // trail
  setFramebuffer(trailFBO);

  useProgram(trailProgram);
  gl.uniform1i(getUniformLocation(trailProgram, 'texture'), useTexture(tmpFBO2[1], 0));
  gl.uniform1i(getUniformLocation(trailProgram, 'old'), useTexture(copyFBO[1], 1));
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // copy
  setFramebuffer(copyFBO);

  useProgram(copyProgram);
  gl.uniform1i(getUniformLocation(copyProgram, 'texture'), useTexture(trailFBO[1], 0));
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  setFramebuffer(null);

  // compose all the effects
  useProgram(mainProgram);
  gl.uniform1i(getUniformLocation(mainProgram, 'base'), useTexture(baseFBO[1], 0));
  gl.uniform1i(getUniformLocation(mainProgram, 'blur'), useTexture(tmpFBO2[1], 1));
  gl.uniform1i(getUniformLocation(mainProgram, 'trail'), useTexture(trailFBO[1], 2));
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function initGL() {
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 1);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);

  drawProgram = makeProgram(baseVert, textureFrag, ['a_pos', 'a_uv', 'a_color']);
  blurProgram = makeProgram(staticVert, blurFrag, ['a_pos']);
  mainProgram = makeProgram(staticVert, mixFrag, ['a_pos']);
  thresholdProgram = makeProgram(staticVert, thresholdFrag, ['a_pos']);
  copyProgram = makeProgram(staticVert, copyFrag, ['a_pos']);
  trailProgram = makeProgram(staticVert, trailFrag, ['a_pos']);

  baseFBO = makeFramebuffer();
  copyFBO = makeFramebuffer();
  tmpFBO1 = makeFramebuffer();
  tmpFBO2 = makeFramebuffer();
  trailFBO = makeFramebuffer();

  quadBuffer = makeQuadBuffer();

  cm.addEventListener('webglcontextlost', handleContextLost, false);
  cm.addEventListener('webglcontextrestored', handleContextRestored, false);
}

function handleContextLost(event) {
  event.preventDefault();
  cancelAnimationFrame(rafId);
}

function handleContextRestored() {
  rafId = requestAnimationFrame(loop);
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

function updateCamera() {

  if (sr > 0) {
    sa += Math.PI / 2;

    sx = Math.sin(sa) * sr;
    sy = Math.cos(sa) * sr;

    sr -= dt / 50;
  } else {
    sx = sy = 0;
  }

  projectionMatrix[6] = -1 + sx / width;
  projectionMatrix[7] = 1 + sy / height;
}

function shakeCamera(r) {
  sa = Math.random() * TWO_PI;
  sr = r;
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

var rafId = requestAnimationFrame(loop);
