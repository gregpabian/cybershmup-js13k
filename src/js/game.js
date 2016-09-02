/* global Stats width height ctx ctxUI performance clicked: true scenes
currentScene: true isMobile handleKeys wrapper sc: true disableAA */

var last = 0;
var dt = 0;
var sw = 0;
var sh = 0;
var lastResize = 0;

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
  ctx.clearRect(0, 0, width, height);
 	ctxUI.clearRect(0, 0, width, height);

  // render scene
  scenes[currentScene][3]();
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

changeScene(currentScene);

requestAnimationFrame(loop);
